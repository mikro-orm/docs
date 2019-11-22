(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{277:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"rightToc",(function(){return r})),t.d(n,"default",(function(){return c}));t(52),t(25),t(20),t(21),t(53),t(0);var o=t(288);function i(){return(i=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e}).apply(this,arguments)}var a={title:"Modeling Entity Relationships",sidebar_label:"Modeling Entity Relationships"},r=[{value:"ManyToOne",id:"manytoone",children:[]},{value:"OneToMany",id:"onetomany",children:[]},{value:"OneToOne",id:"onetoone",children:[{value:"Owning Side",id:"owning-side",children:[]},{value:"Inverse Side",id:"inverse-side",children:[]}]},{value:"ManyToMany",id:"manytomany",children:[{value:"Owning Side",id:"owning-side-1",children:[]},{value:"Inverse Side",id:"inverse-side-1",children:[]}]}],s={rightToc:r},l="wrapper";function c(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,o,i={},a=Object.keys(e);for(o=0;o<a.length;o++)t=a[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,["components"]);return Object(o.b)(l,i({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"There are 4 types of entity relationships in MikroORM: "),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"ManyToOne"),Object(o.b)("li",{parentName:"ul"},"OneToMany"),Object(o.b)("li",{parentName:"ul"},"OneToOne"),Object(o.b)("li",{parentName:"ul"},"ManyToMany")),Object(o.b)("p",null,"Relations can be unidirectional and bidirectional. Unidirectional are defined only on one\nside (the owning side). Bidirectional are defined on both sides, while one is owning side\n(where references are store), marked by ",Object(o.b)("inlineCode",{parentName:"p"},"inversedBy")," attribute pointing to the inverse side.\nOn the inversed side we define it with ",Object(o.b)("inlineCode",{parentName:"p"},"mappedBy")," attribute pointing back to the owner:"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"When modeling bidirectional relationship, you can also omit the ",Object(o.b)("inlineCode",{parentName:"p"},"inversedBy")," attribute,\ndefining ",Object(o.b)("inlineCode",{parentName:"p"},"mappedBy")," on the inverse side is enough as it will be auto-wired. ")),Object(o.b)("h2",{id:"manytoone"},"ManyToOne"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Many instances of the current Entity refer to One instance of the referred Entity.")),Object(o.b)("p",null,"There are multiple ways how to define the relationship, all of following is equivalent:"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class Book implements IdEntity<Book> {\n\n  @ManyToOne() // plain decorator is enough, type will be sniffer via reflection!\n  author1!: Author;\n\n  @ManyToOne(() => Author) // you can specify type manually as a callback\n  author2!: Author;\n\n  @ManyToOne('Author') // or as a string\n  author3!: Author;\n\n  @ManyToOne({ entity: () => Author }) // or use options object\n  author4!: Author;\n\n}\n")),Object(o.b)("p",null,"You can also specify how operations on given entity should should ",Object(o.b)("a",i({parentName:"p"},{href:"/docs/cascading"}),"cascade"),"\nto the referred entity."),Object(o.b)("h2",{id:"onetomany"},"OneToMany"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"One instance of the current Entity has Many instances (references) to the referred Entity.")),Object(o.b)("p",null,"Again, all of following is equivalent:"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class Author implements IdEntity<Author> {\n\n  @OneToMany(() => Book, book => book.author)\n  books1 = new Collection<Book>(this);\n\n  @OneToMany('Book', 'author')\n  books2 = new Collection<Book>(this);\n\n  @OneToMany({ mappedBy: book => book.author }) // referenced entity type can be sniffer too\n  books3 = new Collection<Book>(this);\n\n  @OneToMany({ entity: () => Book, mappedBy: 'author', orphanRemoval: true })\n  books4 = new Collection<Book>(this);\n\n}\n")),Object(o.b)("p",null,"As you can see, OneToMany is the inverse side of ManyToOne (which is the owning side).\nMore about how collections work can be found on ",Object(o.b)("a",i({parentName:"p"},{href:"/docs/collections"}),"collections page"),". "),Object(o.b)("p",null,"You can also specify how operations on given entity should should ",Object(o.b)("a",i({parentName:"p"},{href:"/docs/cascading"}),"cascade")," to the referred\nentities. There is also more aggressive remove mode called ",Object(o.b)("a",i({parentName:"p"},{href:"/docs/cascading#orphan-removal"}),"Orphan Removal"),"\n(",Object(o.b)("inlineCode",{parentName:"p"},"books4")," example)."),Object(o.b)("h2",{id:"onetoone"},"OneToOne"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"One instance of the current Entity refers to One instance of the referred Entity.")),Object(o.b)("p",null,"This is a variant of ManyToOne, where there is always just one entity on both sides. This means\nthat the foreign key column is also unique."),Object(o.b)("h3",{id:"owning-side"},"Owning Side"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class User implements IdEntity<User> {\n\n  // when none of `owner/inverseBy/mappedBy` is provided, it will be considered owning side\n  @OneToOne()\n  bestFriend1!: User;\n\n  // side with `inversedBy` is the owning one, to define inverse side use `mappedBy`\n  @OneToOne({ inversedBy: 'bestFriend1', orphanRemoval: true })\n  bestFriend2!: User;\n\n  // when defining it like this, you need to specifically mark the owning side with `owner: true`\n  @OneToOne(() => User, user => user.bestFriend2, { owner: true, orphanRemoval: true })\n  bestFriend3!: User;\n\n}\n")),Object(o.b)("h3",{id:"inverse-side"},"Inverse Side"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class User implements IdEntity<User> {\n\n  @OneToOne({ mappedBy: 'bestFriend1' })\n  bestFriend1!: User;\n\n  @OneToOne(() => User, user => user.bestFriend2)\n  bestFriend2!: User;\n\n}\n")),Object(o.b)("p",null,"As you can see, relationships can be also self-referencing (all of them. OneToOne also supports\n",Object(o.b)("a",i({parentName:"p"},{href:"/docs/cascading#orphan-removal"}),"Orphan Removal"),". "),Object(o.b)("h2",{id:"manytomany"},"ManyToMany"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Many instances of the current Entity refers to Many instances of the referred Entity.")),Object(o.b)("p",null,"Here are examples of how you can define ManyToMany relationship:"),Object(o.b)("h3",{id:"owning-side-1"},"Owning Side"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class Book implements IdEntity<Book> {\n\n  // when none of `owner/inverseBy/mappedBy` is provided, it will be considered owning side\n  @ManyToMany()\n  tags1 = new Collection<BookTag>(this);\n\n  @ManyToMany(() => BookTag, 'books', { owner: true })\n  tags2 = new Collection<BookTag>(this);\n\n  @ManyToMany(() => BookTag, 'books', { owner: true })\n  tags3 = new Collection<BookTag>(this);\n\n  @ManyToMany(() => BookTag, 'books', { owner: true })\n  tags4 = new Collection<BookTag>(this);\n\n  // to define uni-directional many to many, simply provide only \n  @ManyToMany(() => Author)\n  friends: Collection<Author> = new Collection<Author>(this);\n\n}\n")),Object(o.b)("h3",{id:"inverse-side-1"},"Inverse Side"),Object(o.b)("pre",null,Object(o.b)("code",i({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class BookTag implements IdEntity<BookTag> {\n\n  // inverse side has to point to the owning side via `mappedBy` attribute/parameter\n  @ManyToMany(() => Book, book => book.tags)\n  books = new Collection<Book>(this);\n\n}\n")),Object(o.b)("p",null,"Again, more information about how collections work can be found on ",Object(o.b)("a",i({parentName:"p"},{href:"/docs/collections"}),"collections page"),". "))}c.isMDXComponent=!0},288:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return b}));var o=t(0),i=t.n(o),a=i.a.createContext({}),r=function(e){var n=i.a.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},s=function(e){var n=r(e.components);return i.a.createElement(a.Provider,{value:n},e.children)};var l="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},p=Object(o.forwardRef)((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,l=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===n.indexOf(o)&&(t[o]=e[o]);return t}(e,["components","mdxType","originalType","parentName"]),p=r(t),b=o,d=p[s+"."+b]||p[b]||c[b]||a;return t?i.a.createElement(d,Object.assign({},{ref:n},l,{components:t})):i.a.createElement(d,Object.assign({},{ref:n},l))}));function b(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,r=new Array(a);r[0]=p;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s[l]="string"==typeof e?e:o,r[1]=s;for(var b=2;b<a;b++)r[b]=t[b];return i.a.createElement.apply(null,r)}return i.a.createElement.apply(null,t)}p.displayName="MDXCreateElement"}}]);