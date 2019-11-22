(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{207:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"rightToc",(function(){return o})),n.d(t,"default",(function(){return s}));n(52),n(25),n(20),n(21),n(53),n(0);var i=n(288);function a(){return(a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}var r={title:"Usage with MongoDB"},o=[{value:"Defining entity",id:"defining-entity",children:[]},{value:"ObjectID and string id duality",id:"objectid-and-string-id-duality",children:[]},{value:"ManyToMany collections with inlined pivot array",id:"manytomany-collections-with-inlined-pivot-array",children:[]},{value:"Native collection methods",id:"native-collection-methods",children:[]}],l={rightToc:o},c="wrapper";function s(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["components"]);return Object(i.b)(c,a({},l,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"To use ",Object(i.b)("inlineCode",{parentName:"p"},"mikro-orm")," with mongo database, do not forget to install ",Object(i.b)("inlineCode",{parentName:"p"},"mongodb")," dependency. As ",Object(i.b)("inlineCode",{parentName:"p"},"MongoDriver"),"\nis the default one, you do not need to provide it."),Object(i.b)("p",null,"Then call ",Object(i.b)("inlineCode",{parentName:"p"},"MikroORM.init")," as part of bootstrapping your app:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const orm = await MikroORM.init({\n  entitiesDirs: ['entities'], // relative to `baseDir`\n  dbName: 'my-db-name',\n  clientUrl: '...',\n});\n")),Object(i.b)("h2",{id:"defining-entity"},"Defining entity"),Object(i.b)("p",null,"When defining entity, do not forget to define primary key like this:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"@PrimaryKey()\n_id: ObjectID;\n")),Object(i.b)("h2",{id:"objectid-and-string-id-duality"},"ObjectID and string id duality"),Object(i.b)("p",null,"Every entity has both ",Object(i.b)("inlineCode",{parentName:"p"},"ObjectID")," and ",Object(i.b)("inlineCode",{parentName:"p"},"string")," id available, also all methods of ",Object(i.b)("inlineCode",{parentName:"p"},"EntityManager"),"\nand ",Object(i.b)("inlineCode",{parentName:"p"},"EntityRepository")," supports querying by both of them. "),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const author = orm.em.getReference('...id...');\nconsole.log(author.id);  // returns '...id...'\nconsole.log(author._id); // returns ObjectID('...id...')\n\n// all of those will return the same results\nconst article = '...article id...'; // string id\nconst book = '...book id...'; // string id\nconst repo = orm.em.getRepository(Author);\nconst foo1 = await repo.find({ id: { $in: [article] }, favouriteBook: book });\nconst bar1 = await repo.find({ id: { $in: [new ObjectID(article)] }, favouriteBook: new ObjectID(book) });\nconst foo2 = await repo.find({ _id: { $in: [article] }, favouriteBook: book });\nconst bar2 = await repo.find({ _id: { $in: [new ObjectID(article)] }, favouriteBook: new ObjectID(book) });\n")),Object(i.b)("h2",{id:"manytomany-collections-with-inlined-pivot-array"},"ManyToMany collections with inlined pivot array"),Object(i.b)("p",null,"As opposed to SQL drivers that use pivot tables, in mongo we can leverage available array type\nto store array of collection items (identifiers). This approach has two main benefits:"),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Collection is stored on owning side entity, so we know how many items are there even before\ninitializing the collection."),Object(i.b)("li",{parentName:"ol"},"As there are no pivot tables, resulting database queries are much simpler.")),Object(i.b)("h2",{id:"native-collection-methods"},"Native collection methods"),Object(i.b)("p",null,"Sometimes you need to perform some bulk operation, or you just want to populate your\ndatabase with initial fixtures. Using ORM for such operations can bring unnecessary\nboilerplate code. In this case, you can use one of ",Object(i.b)("inlineCode",{parentName:"p"},"nativeInsert/nativeUpdate/nativeDelete"),"\nmethods:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"EntityManager.nativeInsert<T extends IEntity>(entityName: string, data: any): Promise<IPrimaryKey>;\nEntityManager.nativeUpdate<T extends IEntity>(entityName: string, where: FilterQuery<T>, data: any): Promise<number>;\nEntityManager.nativeDelete<T extends IEntity>(entityName: string, where: FilterQuery<T> | any): Promise<number>;\n")),Object(i.b)("p",null,"Those methods execute native driver methods like Mongo's ",Object(i.b)("inlineCode",{parentName:"p"},"insertOne/updateMany/deleteMany")," collection methods respectively.\nThis is common interface for all drivers, so for MySQL driver, it will fire native SQL queries.\nKeep in mind that they do not hydrate results to entities, and they do not trigger lifecycle hooks. "),Object(i.b)("p",null,"They are also available as ",Object(i.b)("inlineCode",{parentName:"p"},"EntityRepository")," shortcuts:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"EntityRepository.nativeInsert(data: any): Promise<IPrimaryKey>;\nEntityRepository.nativeUpdate(where: FilterQuery<T>, data: any): Promise<number>;\nEntityRepository.nativeDelete(where: FilterQuery<T> | any): Promise<number>;\n")),Object(i.b)("p",null,"There is also shortcut for calling ",Object(i.b)("inlineCode",{parentName:"p"},"aggregate")," method:"),Object(i.b)("pre",null,Object(i.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"EntityManager.aggregate(entityName: string, pipeline: any[]): Promise<any[]>;\nEntityRepository.aggregate(pipeline: any[]): Promise<any[]>;\n")),Object(i.b)("p",null,Object(i.b)("a",a({parentName:"p"},{href:"/docs/v2/index#table-of-contents"}),"\u2190"," Back to table of contents")))}s.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return d}));var i=n(0),a=n.n(i),r=a.a.createContext({}),o=function(e){var t=a.a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},l=function(e){var t=o(e.components);return a.a.createElement(r.Provider,{value:t},e.children)};var c="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},p=Object(i.forwardRef)((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&-1===t.indexOf(i)&&(n[i]=e[i]);return n}(e,["components","mdxType","originalType","parentName"]),p=o(n),d=i,b=p[l+"."+d]||p[d]||s[d]||r;return n?a.a.createElement(b,Object.assign({},{ref:t},c,{components:n})):a.a.createElement(b,Object.assign({},{ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=p;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:i,o[1]=l;for(var d=2;d<r;d++)o[d]=n[d];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);