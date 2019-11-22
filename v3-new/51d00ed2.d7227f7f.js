(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{184:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"rightToc",(function(){return r})),n.d(t,"default",(function(){return b}));n(52),n(25),n(20),n(21),n(53),n(0);var i=n(288);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var o={title:"Working with Entity Manager",sidebar_label:"Entity Manager"},r=[{value:"Persist and Flush",id:"persist-and-flush",children:[]},{value:"Persisting and Cascading",id:"persisting-and-cascading",children:[{value:"Auto-flushing",id:"auto-flushing",children:[]}]},{value:"Fetching Entities with EntityManager",id:"fetching-entities-with-entitymanager",children:[{value:"Conditions Object (<code>FilterQuery<T></code>)",id:"conditions-object-filterqueryt",children:[]},{value:"Searching by referenced entity fields",id:"searching-by-referenced-entity-fields",children:[]},{value:"Fetching Partial Entities",id:"fetching-partial-entities",children:[]},{value:"Fetching Paginated Results",id:"fetching-paginated-results",children:[]},{value:"Handling Not Found Entities",id:"handling-not-found-entities",children:[]}]},{value:"Type of Fetched Entities",id:"type-of-fetched-entities",children:[]},{value:"Entity Repositories",id:"entity-repositories",children:[]},{value:"EntityManager API",id:"entitymanager-api",children:[]}],s={rightToc:r},l="wrapper";function b(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["components"]);return Object(i.b)(l,a({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"persist-and-flush"},"Persist and Flush"),Object(i.b)("p",null,"There are 2 methods we should first describe to understand how persisting works in MikroORM:\n",Object(i.b)("inlineCode",{parentName:"p"},"em.persist()")," and ",Object(i.b)("inlineCode",{parentName:"p"},"em.flush()"),"."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"em.persist(entity, flush?: boolean)")," is used to mark new entities for future persisting.\nIt will make the entity managed by given ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager")," and once ",Object(i.b)("inlineCode",{parentName:"p"},"flush")," will be called, it\nwill be written to the database. Second boolean parameter can be used to invoke ",Object(i.b)("inlineCode",{parentName:"p"},"flush"),"\nimmediately. Its default value is configurable via ",Object(i.b)("inlineCode",{parentName:"p"},"autoFlush")," option."),Object(i.b)("p",null,"To understand ",Object(i.b)("inlineCode",{parentName:"p"},"flush"),", lets first define what managed entity is: An entity is managed if\nit\u2019s fetched from the database (via ",Object(i.b)("inlineCode",{parentName:"p"},"em.find()"),", ",Object(i.b)("inlineCode",{parentName:"p"},"em.findOne()")," or via other managed entity)\nor registered as new through ",Object(i.b)("inlineCode",{parentName:"p"},"em.persist()"),"."),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"em.flush()")," will go through all managed entities, compute appropriate change sets and\nperform according database queries. As an entity loaded from database becomes managed\nautomatically, you do not have to call persist on those, and flush is enough to update\nthem."),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const book = await orm.em.findOne(Book, 1);\nbook.title = 'How to persist things...';\n\n// no need to persist `book` as its already managed by the EM\nawait orm.em.flush();\n")),Object(i.b)("h2",{id:"persisting-and-cascading"},"Persisting and Cascading"),Object(i.b)("p",null,"To save entity state to database, you need to persist it. Persist takes care or deciding\nwhether to use ",Object(i.b)("inlineCode",{parentName:"p"},"insert")," or ",Object(i.b)("inlineCode",{parentName:"p"},"update")," and computes appropriate change-set. Entity references\nthat are not persisted yet (does not have identifier) will be cascade persisted automatically. "),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"// use constructors in your entities for required parameters\nconst author = new Author('Jon Snow', 'snow@wall.st');\nauthor.born = new Date();\n\nconst publisher = new Publisher('7K publisher');\n\nconst book1 = new Book('My Life on The Wall, part 1', author);\nbook1.publisher = publisher;\nconst book2 = new Book('My Life on The Wall, part 2', author);\nbook2.publisher = publisher;\nconst book3 = new Book('My Life on The Wall, part 3', author);\nbook3.publisher = publisher;\n\n// just persist books, author and publisher will be automatically cascade persisted\nawait orm.em.persistAndFlush([book1, book2, book3]);\n\n// or one by one\norm.em.persistLater(book1);\norm.em.persistLater(book2);\norm.em.persistLater(book3); \nawait orm.em.flush(); // flush everything to database at once\n")),Object(i.b)("h3",{id:"auto-flushing"},"Auto-flushing"),Object(i.b)("p",null,"Since MikroORM v3, default value for ",Object(i.b)("inlineCode",{parentName:"p"},"autoFlush")," is ",Object(i.b)("inlineCode",{parentName:"p"},"false"),". That means you need to call\n",Object(i.b)("inlineCode",{parentName:"p"},"em.flush()")," yourself to persist changes into database. You can still change this via ORM's\noptions to ease the transition but generally it is not recommended as it can cause unwanted\nsmall transactions being created around each ",Object(i.b)("inlineCode",{parentName:"p"},"persist"),". "),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"orm.em.persist(new Entity()); // no auto-flushing by default\nawait orm.em.flush();\nawait orm.em.persist(new Entity(), true); // you can still use second parameter to auto-flush\n")),Object(i.b)("h2",{id:"fetching-entities-with-entitymanager"},"Fetching Entities with EntityManager"),Object(i.b)("p",null,"To fetch entities from database you can use ",Object(i.b)("inlineCode",{parentName:"p"},"find()")," and ",Object(i.b)("inlineCode",{parentName:"p"},"findOne()")," of ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager"),": "),Object(i.b)("p",null,"Example:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, '...id...');\nconst books = await orm.em.find(Book, {});\n\nfor (const author of authors) {\n  console.log(author.name); // Jon Snow\n\n  for (const book of author.books) {\n    console.log(book.title); // initialized\n    console.log(book.author.isInitialized()); // true\n    console.log(book.author.id);\n    console.log(book.author.name); // Jon Snow\n    console.log(book.publisher); // just reference\n    console.log(book.publisher.isInitialized()); // false\n    console.log(book.publisher.id);\n    console.log(book.publisher.name); // undefined\n  }\n}\n")),Object(i.b)("h3",{id:"conditions-object-filterqueryt"},"Conditions Object (",Object(i.b)("inlineCode",{parentName:"h3"},"FilterQuery<T>"),")"),Object(i.b)("p",null,"Querying entities via conditions object (",Object(i.b)("inlineCode",{parentName:"p"},"where")," in ",Object(i.b)("inlineCode",{parentName:"p"},"em.find(Entity, where: FilterQuery<T>)"),")\nsupports many different ways:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"// search by entity properties\nconst users = await orm.em.find(User, { firstName: 'John' });\n\n// for searching by reference you can use primary key directly\nconst id = 1;\nconst users = await orm.em.find(User, { organization: id });\n\n// or pass unpopulated reference (including `Reference` wrapper)\nconst ref = await orm.em.getReference(Organization, id);\nconst users = await orm.em.find(User, { organization: ref });\n\n// fully populated entities as also supported\nconst ent = await orm.em.findOne(Organization, id);\nconst users = await orm.em.find(User, { organization: ent });\n\n// complex queries with operators\nconst users = await orm.em.find(User, { $and: [{ id: { $nin: [3, 4] } }, { id: { $gt: 2 } }] });\n\n// you can also search for array of primary keys directly\nconst users = await orm.em.find(User, [1, 2, 3, 4, 5]);\n\n// and in findOne all of this works, plus you can search by single primary key\nconst user1 = await orm.em.findOne(User, 1);\n")),Object(i.b)("p",null,"As you can see in the fifth example, one can also use operators like ",Object(i.b)("inlineCode",{parentName:"p"},"$and"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$or"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$gte"),",\n",Object(i.b)("inlineCode",{parentName:"p"},"$gt"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$lte"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$lt"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$in"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$nin"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$eq"),", ",Object(i.b)("inlineCode",{parentName:"p"},"$ne"),". More about that can be found in\n",Object(i.b)("a",a({parentName:"p"},{href:"/docs/query-conditions"}),"Query Conditions")," section. "),Object(i.b)("h4",{id:"mitigating-type-instantiation-is-excessively-deep-and-possibly-infinitets2589-error"},"Mitigating ",Object(i.b)("inlineCode",{parentName:"h4"},"Type instantiation is excessively deep and possibly infinite.ts(2589)")," error"),Object(i.b)("p",null,"Sometimes you might be facing TypeScript errors caused by too complex query for it to\nproperly infer all types. Usually it can be solved by providing the type argument\nexplicitly."),Object(i.b)("p",null,"You can also opt in to use repository instead, as there the type inference should not be\nproblematic. "),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"As a last resort, you can always type cast the query to ",Object(i.b)("inlineCode",{parentName:"p"},"any"),".")),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const books = await orm.em.find<Book>(Book, { ... your complex query ... });\n// or\nconst books = await orm.em.getRepository(Book).find({ ... your complex query ... });\n// or\nconst books = await orm.em.find<any>(Book, { ... your complex query ... }) as Book[];\n")),Object(i.b)("p",null,"Another problem you might be facing is ",Object(i.b)("inlineCode",{parentName:"p"},"RangeError: Maximum call stack size exceeded")," error\nthrown during TypeScript compilation (usually from file ",Object(i.b)("inlineCode",{parentName:"p"},"node_modules/typescript/lib/typescript.js"),").\nThe solution to this is the same, just provide the type argument explicitly."),Object(i.b)("h3",{id:"searching-by-referenced-entity-fields"},"Searching by referenced entity fields"),Object(i.b)("p",null,"You can also search by referenced entity properties. Simply pass nested where condition like\nthis and all requested relationships will be automatically joined. Currently it will only join\nthem so you can search and sort by those. To populate entities, do not forget to pass the populate\nparameter as well. "),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"// find author of a book that has tag specified by name\nconst author = await orm.em.findOne(Author, { books: { tags: { name: 'Tag name' } } });\nconsole.log(author.books.isInitialized()); // false, as it only works for query and sort\n\nconst author = await orm.em.findOne(Author, { books: { tags: { name: 'Tag name' } } }, ['books.tags']);\nconsole.log(author.books.isInitialized()); // true, because it was populated\nconsole.log(author.books[0].tags.isInitialized()); // true, because it was populated\nconsole.log(author.books[0].tags[0].isInitialized()); // true, because it was populated\n")),Object(i.b)("h3",{id:"fetching-partial-entities"},"Fetching Partial Entities"),Object(i.b)("p",null,"When fetching single entity, you can choose to select only parts of an entity via ",Object(i.b)("inlineCode",{parentName:"p"},"options.fields"),":"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, '...', { fields: ['name', 'born'] });\nconsole.log(author.id); // PK is always selected\nconsole.log(author.name); // Jon Snow\nconsole.log(author.email); // undefined\n")),Object(i.b)("h3",{id:"fetching-paginated-results"},"Fetching Paginated Results"),Object(i.b)("p",null,"If you are going to paginate your results, you can use ",Object(i.b)("inlineCode",{parentName:"p"},"em.findAndCount()")," that will return\ntotal count of entities before applying limit and offset."),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const [authors, count] = await orm.em.findAndCount(Author, { ... }, { limit: 10, offset: 50 });\nconsole.log(authors.length); // based on limit parameter, e.g. 10\nconsole.log(count); // total count, e.g. 1327\n")),Object(i.b)("h3",{id:"handling-not-found-entities"},"Handling Not Found Entities"),Object(i.b)("p",null,"When you call ",Object(i.b)("inlineCode",{parentName:"p"},"em.findOne()")," and no entity is found based on your criteria, ",Object(i.b)("inlineCode",{parentName:"p"},"null")," will be\nreturned. If you rather have an ",Object(i.b)("inlineCode",{parentName:"p"},"Error")," instance thrown, you can use ",Object(i.b)("inlineCode",{parentName:"p"},"em.findOneOrFail()"),":"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, { name: 'does-not-exist' });\nconsole.log(author === null); // true\n\ntry {\n  const author = await orm.em.findOneOrFail(Author, { name: 'does-not-exist' });\n  // author will be always found here\n} catch (e) {\n  console.error('Not found', e);\n}\n")),Object(i.b)("p",null,"You can customize the error either globally via ",Object(i.b)("inlineCode",{parentName:"p"},"findOneOrFailHandler")," option, or locally via\n",Object(i.b)("inlineCode",{parentName:"p"},"failHandler")," option in ",Object(i.b)("inlineCode",{parentName:"p"},"findOneOrFail")," call."),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"try {\n  const author = await orm.em.findOneOrFail(Author, { name: 'does-not-exist' }, {\n    failHandler: (entityName: string, where: Record<string, any> | IPrimaryKey) => new Error(`Failed: ${entityName} in ${util.inspect(where)}`)\n  });\n} catch (e) {\n  console.error(e); // your custom error\n}\n")),Object(i.b)("h2",{id:"type-of-fetched-entities"},"Type of Fetched Entities"),Object(i.b)("p",null,"Both ",Object(i.b)("inlineCode",{parentName:"p"},"em.find")," and ",Object(i.b)("inlineCode",{parentName:"p"},"em.findOne()")," methods have generic return types.\nAll of following examples are equal and will let typescript correctly infer the entity type:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const author1 = await orm.em.findOne<Author>(Author.name, '...id...');\nconst author2 = await orm.em.findOne<Author>('Author', '...id...');\nconst author3 = await orm.em.findOne(Author, '...id...');\n")),Object(i.b)("p",null,"As the last one is the least verbose, it should be preferred. "),Object(i.b)("h2",{id:"entity-repositories"},"Entity Repositories"),Object(i.b)("p",null,"Although you can use ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager")," directly, much more convenient way is to use\n",Object(i.b)("a",a({parentName:"p"},{href:"https://mikro-orm.io/repositories/"}),Object(i.b)("inlineCode",{parentName:"a"},"EntityRepository")," instead"),". You can register\nyour repositories in dependency injection container like ",Object(i.b)("a",a({parentName:"p"},{href:"http://inversify.io/"}),"InversifyJS"),"\nso you do not need to get them from ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager")," each time."),Object(i.b)("p",null,"For more examples, take a look at\n",Object(i.b)("a",a({parentName:"p"},{href:"https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mongo.test.ts"}),Object(i.b)("inlineCode",{parentName:"a"},"tests/EntityManager.mongo.test.ts")),"\nor ",Object(i.b)("a",a({parentName:"p"},{href:"https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mysql.test.ts"}),Object(i.b)("inlineCode",{parentName:"a"},"tests/EntityManager.mysql.test.ts")),"."),Object(i.b)("h2",{id:"entitymanager-api"},"EntityManager API"),Object(i.b)("h4",{id:"getrepositoryt-extends-anyentityentityname-string--entityclasst-entityrepositoryt"},Object(i.b)("inlineCode",{parentName:"h4"},"getRepository<T extends AnyEntity>(entityName: string | EntityClass<T>): EntityRepository<T>")),Object(i.b)("p",null,"Returns ",Object(i.b)("inlineCode",{parentName:"p"},"EntityRepository")," for given entity, respects ",Object(i.b)("inlineCode",{parentName:"p"},"customRepository")," option of ",Object(i.b)("inlineCode",{parentName:"p"},"@Entity"),"\nand ",Object(i.b)("inlineCode",{parentName:"p"},"entityRepository")," option of ",Object(i.b)("inlineCode",{parentName:"p"},"MikroORM.init()"),"."),Object(i.b)("h4",{id:"findt-extends-anyentityentityname-string--entityclasst-where-filterqueryt-options-findoptions-promiset"},Object(i.b)("inlineCode",{parentName:"h4"},"find<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T>, options?: FindOptions): Promise<T[]>")),Object(i.b)("p",null,"Returns array of entities found for given condition. You can specify ",Object(i.b)("inlineCode",{parentName:"p"},"FindOptions")," to request\npopulation of referenced entities or control the pagination:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"export interface FindOptions {\n  populate?: string[];\n  orderBy?: { [k: string]: QueryOrder };\n  limit?: number;\n  offset?: number;\n}\n")),Object(i.b)("hr",null),Object(i.b)("h4",{id:"findt-extends-anyentityentityname-string--entityclasst-where-filterqueryt-populate-string-orderby--k-string-queryorder--limit-number-offset-number-promiset"},Object(i.b)("inlineCode",{parentName:"h4"},"find<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T>, populate?: string[], orderBy?: { [k: string]: QueryOrder }, limit?: number, offset?: number): Promise<T[]>")),Object(i.b)("p",null,"Same as previous ",Object(i.b)("inlineCode",{parentName:"p"},"find")," method, just with dedicated parameters for ",Object(i.b)("inlineCode",{parentName:"p"},"populate"),", ",Object(i.b)("inlineCode",{parentName:"p"},"orderBy"),", ",Object(i.b)("inlineCode",{parentName:"p"},"limit"),"\nand ",Object(i.b)("inlineCode",{parentName:"p"},"offset"),"."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"findandcountt-extends-anyentityentityname-string--entityclasst-where-filterqueryt-populate-string-orderby--k-string-queryorder--limit-number-offset-number-promiset-number"},Object(i.b)("inlineCode",{parentName:"h4"},"findAndCount<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T>, populate?: string[], orderBy?: { [k: string]: QueryOrder }, limit?: number, offset?: number): Promise<[T[], number]>")),Object(i.b)("p",null,"Combination of ",Object(i.b)("inlineCode",{parentName:"p"},"find")," and ",Object(i.b)("inlineCode",{parentName:"p"},"count")," methods. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"findonet-extends-anyentityentityname-string--entityclasst-where-filterqueryt--iprimarykey-populate-string-promiset--null"},Object(i.b)("inlineCode",{parentName:"h4"},"findOne<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T> | IPrimaryKey, populate?: string[]): Promise<T | null>")),Object(i.b)("p",null,"Finds an entity by given ",Object(i.b)("inlineCode",{parentName:"p"},"where")," condition. You can use primary key as ",Object(i.b)("inlineCode",{parentName:"p"},"where")," value, then\nif the entity is already managed, no database call will be made. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"findoneorfailt-extends-anyentityentityname-string--entityclasst-where-filterqueryt--iprimarykey-populate-string-promiset"},Object(i.b)("inlineCode",{parentName:"h4"},"findOneOrFail<T extends AnyEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T> | IPrimaryKey, populate?: string[]): Promise<T>")),Object(i.b)("p",null,"Just like ",Object(i.b)("inlineCode",{parentName:"p"},"findOne"),", but throws when entity not found, so it always resolves to given entity.\nYou can customize the error either globally via ",Object(i.b)("inlineCode",{parentName:"p"},"findOneOrFailHandler")," option, or locally via\n",Object(i.b)("inlineCode",{parentName:"p"},"failHandler")," option in ",Object(i.b)("inlineCode",{parentName:"p"},"findOneOrFail")," call."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"merget-extends-anyentityentityname-string--entityclasst-data-entitydatat-t"},Object(i.b)("inlineCode",{parentName:"h4"},"merge<T extends AnyEntity>(entityName: string | EntityClass<T>, data: EntityData<T>): T")),Object(i.b)("p",null,"Adds given entity to current Identity Map. After merging, entity becomes managed.\nThis is useful when you want to work with cached entities. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"mapt-extends-anyentityentityname-string--entityclasst-data-entitydatat-t"},Object(i.b)("inlineCode",{parentName:"h4"},"map<T extends AnyEntity>(entityName: string | EntityClass<T>, data: EntityData<T>): T")),Object(i.b)("p",null,"Maps raw DB result to entity, adding it to current Identity Map. Equivalent to\n",Object(i.b)("inlineCode",{parentName:"p"},"IDatabaseDriver.mapResult()")," followed by ",Object(i.b)("inlineCode",{parentName:"p"},"em.merge()"),"."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"getreferencet-extends-anyentityentityname-string--entityclasst-id-string-t"},Object(i.b)("inlineCode",{parentName:"h4"},"getReference<T extends AnyEntity>(entityName: string | EntityClass<T>, id: string): T")),Object(i.b)("p",null,"Gets a reference to the entity identified by the given type and identifier without actually\nloading it, if the entity is not yet loaded."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"countentityname-string--entityclasst-where-filterqueryt-promisenumber"},Object(i.b)("inlineCode",{parentName:"h4"},"count(entityName: string | EntityClass<T>, where?: FilterQuery<T>): Promise<number>")),Object(i.b)("p",null,"Gets count of entities matching the ",Object(i.b)("inlineCode",{parentName:"p"},"where")," condition. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"persistentity-anyentity--anyentity-flush-boolean-void--promisevoid"},Object(i.b)("inlineCode",{parentName:"h4"},"persist(entity: AnyEntity | AnyEntity[], flush?: boolean): void | Promise<void>")),Object(i.b)("p",null,"Tells the EntityManager to make an instance managed and persistent. The entity will be\nentered into the database at or before transaction commit or as a result of the flush\noperation. You can control immediate flushing via ",Object(i.b)("inlineCode",{parentName:"p"},"flush")," parameter and via ",Object(i.b)("inlineCode",{parentName:"p"},"autoFlush"),"\nconfiguration option. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"persistandflushentity-anyentity--anyentity-promisevoid"},Object(i.b)("inlineCode",{parentName:"h4"},"persistAndFlush(entity: AnyEntity | AnyEntity[]): Promise<void>")),Object(i.b)("p",null,"Shortcut for ",Object(i.b)("inlineCode",{parentName:"p"},"persist")," & ",Object(i.b)("inlineCode",{parentName:"p"},"flush"),"."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"persistlaterentity-anyentity--anyentity-void"},Object(i.b)("inlineCode",{parentName:"h4"},"persistLater(entity: AnyEntity | AnyEntity[]): void")),Object(i.b)("p",null,"Shortcut for just ",Object(i.b)("inlineCode",{parentName:"p"},"persist"),", without flushing. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"flush-promisevoid"},Object(i.b)("inlineCode",{parentName:"h4"},"flush(): Promise<void>")),Object(i.b)("p",null,"Flushes all changes to objects that have been queued up to now to the database."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"removeentityname-string--entityclasst-where-anyentity--filterqueryt--iprimarykey-flush-boolean-promisenumber"},Object(i.b)("inlineCode",{parentName:"h4"},"remove(entityName: string | EntityClass<T>, where: AnyEntity | FilterQuery<T> | IPrimaryKey, flush?: boolean): Promise<number>")),Object(i.b)("p",null,"When provided entity instance as ",Object(i.b)("inlineCode",{parentName:"p"},"where")," value, then it calls ",Object(i.b)("inlineCode",{parentName:"p"},"removeEntity(entity, flush)"),",\notherwise it fires delete query with given ",Object(i.b)("inlineCode",{parentName:"p"},"where")," condition. "),Object(i.b)("p",null,"This method fires ",Object(i.b)("inlineCode",{parentName:"p"},"beforeDelete")," and ",Object(i.b)("inlineCode",{parentName:"p"},"afterDelete")," hooks only if you provide entity instance.  "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"removeentityentity-anyentity-flush-boolean-promisenumber"},Object(i.b)("inlineCode",{parentName:"h4"},"removeEntity(entity: AnyEntity, flush?: boolean): Promise<number>")),Object(i.b)("p",null,"Removes an entity instance. A removed entity will be removed from the database at or before\ntransaction commit or as a result of the flush operation. You can control immediate flushing\nvia ",Object(i.b)("inlineCode",{parentName:"p"},"flush")," parameter and via ",Object(i.b)("inlineCode",{parentName:"p"},"autoFlush")," configuration option."),Object(i.b)("p",null,"This method fires ",Object(i.b)("inlineCode",{parentName:"p"},"beforeDelete")," and ",Object(i.b)("inlineCode",{parentName:"p"},"afterDelete")," hooks.  "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"removeandflushentity-anyentity-promisevoid"},Object(i.b)("inlineCode",{parentName:"h4"},"removeAndFlush(entity: AnyEntity): Promise<void>")),Object(i.b)("p",null,"Shortcut for ",Object(i.b)("inlineCode",{parentName:"p"},"removeEntity")," & ",Object(i.b)("inlineCode",{parentName:"p"},"flush"),"."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"removelaterentity-anyentity-void"},Object(i.b)("inlineCode",{parentName:"h4"},"removeLater(entity: AnyEntity): void")),Object(i.b)("p",null,"Shortcut for ",Object(i.b)("inlineCode",{parentName:"p"},"removeEntity")," without flushing. "),Object(i.b)("hr",null),Object(i.b)("h4",{id:"clear-void"},Object(i.b)("inlineCode",{parentName:"h4"},"clear(): void")),Object(i.b)("p",null,"Clears the EntityManager. All entities that are currently managed by this EntityManager\nbecome detached."),Object(i.b)("hr",null),Object(i.b)("h4",{id:"canpopulateentityname-string--entityclasst-property-string-boolean"},Object(i.b)("inlineCode",{parentName:"h4"},"canPopulate(entityName: string | EntityClass<T>, property: string): boolean")),Object(i.b)("p",null,"Returns whether given entity has given property which can be populated (is reference or\ncollection)."),Object(i.b)("hr",null))}b.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return p}));var i=n(0),a=n.n(i),o=a.a.createContext({}),r=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},s=function(e){var t=r(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var l="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},c=Object(i.forwardRef)((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,l=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&-1===t.indexOf(i)&&(n[i]=e[i]);return n}(e,["components","mdxType","originalType","parentName"]),c=r(n),p=i,d=c[s+"."+p]||c[p]||b[p]||o;return n?a.a.createElement(d,Object.assign({},{ref:t},l,{components:n})):a.a.createElement(d,Object.assign({},{ref:t},l))}));function p(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=c;var s={};for(var b in t)hasOwnProperty.call(t,b)&&(s[b]=t[b]);s.originalType=e,s[l]="string"==typeof e?e:i,r[1]=s;for(var p=2;p<o;p++)r[p]=n[p];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}c.displayName="MDXCreateElement"}}]);