---
id: handling-transactions-and-concurrency-in-mikroorm
title: Handling Transactions and Concurrency in MikroORM
author: Martin Adámek
authorTitle: Maintainer of MikroORM
authorURL: https://github.com/B4nan
authorImageURL: https://avatars1.githubusercontent.com/u/615580?s=460&v=4
authorTwitter: B4nan
tags: [typescript, javascript, node, sql]
---

How to handle transactions and concurrency with ease.

<!--truncate-->

## Note about persisting

There are 2 methods we should first describe to understand how persisting works in MikroORM: `em.persist()` and `em.flush()`.

`em.persist(entity, flush?: boolean)` is used to mark new entities for future persisting. It will make the entity managed by given `EntityManager` and once `flush` will be called, it will be written to the database. Second boolean parameter can be used to invoke `flush` immediately. Its default value is configurable via `autoFlush` option.

> Default value of `autoFlush` is currently set to `true`, which will change in upcoming major release. Users are encouraged to either set `autoFlush` to `false` or use `em.persistLater()` (equal to `em.persist(entity, false)`) and `em.persistAndFlush()` methods instead. Every time persisting is mentioned in this article, it is with `autoFlush` set to `false` in mind.

To understand `flush`, lets first define what managed entity is: An entity is managed if it’s fetched from the database (via `em.find()`, `em.findOne()` or via other managed entity) or registered as new through `em.persist()`.

`em.flush()` will go through all managed entities, compute appropriate change sets and perform according database queries. As an entity loaded from database becomes managed automatically, you do not have to call `persist` on those, and `flush` is enough to update them.

![](https://cdn-images-1.medium.com/max/1600/0*Eo5JP9abOfPV24Uf.jpg)

## Transaction demarcation

Transaction demarcation is the task of defining your transaction boundaries. For the most part, MikroORM already takes care of proper transaction demarcation for you: All the write operations (INSERT/UPDATE/DELETE) are queued until `em.flush()` is invoked which wraps all of these changes in a single transaction. However, MikroORM also allows (and encourages) you to take over and control transaction demarcation yourself.

### Approach 1: Implicitly

The first approach is to use the implicit transaction handling provided by the MikroORM `EntityManager`. Given the following code snippet, without any explicit transaction demarcation:

{gist B4nan/4a2b9479c0f2578c1407c5b22ff19327}

Since we do not do any custom transaction demarcation in the above code, `em.flush()` will begin and commit/rollback a transaction. This is sufficient if all the data manipulation that is part of a unit of work happens through the domain model and thus the ORM — in other words, unless you run some write queries manually, via `QueryBuilder`, or use one of `em.nativeInsert/Update/Delete` helpers.

Here is a bit more complex example where multiple entities are involved:

{gist B4nan/2a93a5d812c7efed32be579c91e3547d}

We load one author by id, all his books and their tags as well as their publisher. For simplicity, let’s assume the author has one book associated, which has one book tag and one publisher.

Then we update multiple things on book of that author, editing name of the tag, adding new one, and changing publisher’s name. As we are working with already managed entities (retrieved from `EntityManager`), we can simply `flush` without needing to `persist` those entities.

The `flush` call here will compute all differences and run database queries accordingly. They will all be encapsulated in a transaction, as you can see from following list of fired queries:

{gist B4nan/591b4831ba7cd7eed3278168186827ff}

### Approach 2: Explicitly

The explicit alternative is to use the transactions API directly to control the boundaries. The code then looks like this:

{gist B4nan/72c6f916d7e1e1c27e0b4dde7ec4ef6a}

Explicit transaction demarcation is required when you want to include custom DBAL operations in a unit of work (e.g. when firing native SQL UPDATE queries) or when you want to make use of some methods of the `EntityManager` API that require an active transaction (e.g. locking) — such methods will throw a `ValidationError` to inform you of that requirement.

A more convenient alternative for explicit transaction demarcation is to use `em.transactional(cb)`. It will automatically start the transaction, execute your asynchronous callback and commit it. In case of an exception during those operations, the transaction will be automatically rolled back and the exception will be re-thrown. An example that is functionally equivalent to the previously shown code looks as follows:

{gist B4nan/5afb06d2a3e500e43d4334ed770a091f}

In the callback parameter, you will get forked `EntityManager` that will contain a copy of the current Identity Map. You should use this copy instead of the parent one for all queries inside the transaction. It will be flushed prior to transaction commit.

### Exception Handling

When using _implicit_ transaction demarcation and an exception occurs during `em.flush()`, the transaction is automatically rolled back.

When using _explicit_ transaction demarcation and an exception occurs, the transaction should be rolled back immediately as demonstrated in the example above. Users are encouraged to use `em.transactional(cb)` which will handle that automatically.

As a result of this procedure, all previously managed or removed instances of the `EntityManager` become detached. The state of the detached objects will be the state at the point at which the transaction was rolled back. The state of the objects is in no way rolled back and thus the objects are now out of sync with the database. The application can continue to use the detached objects, knowing that their state is potentially no longer accurate.

If you intend to start another unit of work after an exception has occurred you should do that with a new `EntityManager`. Simply use `em.fork()` to obtain fresh copy with cleared identity map.

![](https://cdn-images-1.medium.com/max/1600/0*D4B7hf_Up9bc9wzg.jpg)

## Concurrency and locking

### Why we need concurrency control?

If transactions are executed _serially_ (one at a time), no transaction concurrency exists. However, if concurrent transactions with interleaving operations are allowed, you may easily run into one of those problems:

1.  The lost update problem
2.  The dirty read problem
3.  The incorrect summary problem

Take a look at [this article](https://www.includehelp.com/dbms/concurrency-and-problem-due-to-concurrency.aspx) for in-depth explanation of those.

To mitigate those problems, MikroORM offers support for Pessimistic and Optimistic locking strategies natively. This allows you to take very fine-grained control over what kind of locking is required for your entities in your application.

### Optimistic Locking

Database transactions are fine for concurrency control during a single request. However, a database transaction should not span across requests, the so-called “user think time”. Therefore a long-running “business transaction” that spans multiple requests needs to involve several database transactions. Thus, database transactions alone can no longer control concurrency during such a long-running business transaction. Concurrency control becomes the partial responsibility of the application itself.

MikroORM has integrated support for automatic optimistic locking via a version field. In this approach any entity that should be protected against concurrent modifications during long-running business transactions gets a version field that is either a simple number or a Date (timestamp). When changes to such an entity are persisted at the end of a long-running conversation the version of the entity is compared to the version in the database and if they don’t match, a `ValidationError` is thrown, indicating that the entity has been modified by someone else already.

To define a version field, simply use `@Property` decorator with `version` flag set to `true`. Only `Date` and `number` types are allowed.

{gist B4nan/294405597b6371030ac2ee2e119cf14a}

> Version numbers (not timestamps) should be preferred as they can not potentially conflict in a highly concurrent environment, unlike timestamps where this is a possibility, depending on the resolution of the timestamp on the particular database platform.

When a version conflict is encountered during `em.flush()`, a `ValidationError` is thrown and the active transaction rolled back (or marked for rollback). This exception can be caught and handled. Potential responses to a `ValidationError` are to present the conflict to the user or to refresh or reload objects in a new transaction and then retrying the transaction.

The time between showing an update form and actually modifying the entity can in the worst scenario be as long as your applications session timeout. If changes happen to the entity in that time frame you want to know directly when retrieving the entity that you will hit an optimistic locking exception.

You can always verify the version of an entity during a request either when calling `em.findOne()`:

{gist B4nan/fc2d8236875827f752499f58abf2d443}

Or you can use `em.lock()` to find out:

{gist B4nan/4f2fcb31dfb6910a4995652d814666ff}

Using optimistic locking correctly, you **have** to pass the version as an additional parameter when updating entity. See following example:

{gist B4nan/91cde4f99a88ee340dff79dec157d3b0}

Your frontend app loads an entity from API, the response includes the version property. User makes some changes and fires PUT request back to the API, with version field included in the payload. The PUT handler of the API then reads the version and passes it to the `em.findOne()` call.

## Pessimistic Locking

MikroORM supports Pessimistic Locking at the database level. Every Entity can be part of a pessimistic lock, there is no special metadata required to use this feature. Pessimistic Locking requires active transaction, so you will have to use explicit transaction demarcation.

MikroORM currently supports two pessimistic lock modes:

*   Pessimistic Write (`LockMode.PESSIMISTIC_WRITE`), locks the underlying database rows for concurrent Read and Write Operations.
*   Pessimistic Read (`LockMode.PESSIMISTIC_READ`), locks other concurrent requests that attempt to update or lock rows in write mode.

You can use pessimistic locks in three different scenarios:

1.  Using `em.findOne(className, id, { lockMode  })`
2.  Using `em.lock(entity, lockMode)`
3.  Using `QueryBuilder.setLockMode(lockMode)`

This is how it looks like in action:

{gist B4nan/5c0fb52c31fe2af55bfb3279e0cdff27}

> Like [MikroORM](https://b4nan.github.io/mikro-orm/)? ⭐️ [Star it](https://github.com/mikro-orm/mikro-orm) on GitHub and share this article with your friends.
