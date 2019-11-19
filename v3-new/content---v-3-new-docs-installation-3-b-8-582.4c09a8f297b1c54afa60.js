(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{179:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"rightToc",(function(){return i})),t.d(n,"default",(function(){return p}));t(59),t(32),t(23),t(24),t(60),t(0);var r=t(233);function a(){return(a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var o={title:"Installation & Usage"},i=[{value:"Entity Discovery in TypeScript",id:"entity-discovery-in-typescript",children:[]},{value:"Setting up the Commandline Tool",id:"setting-up-the-commandline-tool",children:[]},{value:"Request Context",id:"request-context",children:[]}],s={rightToc:i},l="wrapper";function p(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,["components"]);return Object(r.b)(l,a({},s,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"First install the module via ",Object(r.b)("inlineCode",{parentName:"p"},"yarn")," or ",Object(r.b)("inlineCode",{parentName:"p"},"npm")," and do not forget to install the database driver as well:"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-sh"}),"$ yarn add mikro-orm mongodb # for mongo\n$ yarn add mikro-orm mysql2  # for mysql/mariadb\n$ yarn add mikro-orm mariadb # for mysql/mariadb\n$ yarn add mikro-orm pg      # for postgresql\n$ yarn add mikro-orm sqlite3 # for sqlite\n")),Object(r.b)("p",null,"or"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-sh"}),"$ npm i -s mikro-orm mongodb # for mongo\n$ npm i -s mikro-orm mysql2  # for mysql/mariadb\n$ npm i -s mikro-orm mariadb # for mysql/mariadb\n$ npm i -s mikro-orm pg      # for postgresql\n$ npm i -s mikro-orm sqlite3 # for sqlite\n")),Object(r.b)("p",null,"Next you will need to enable support for ",Object(r.b)("a",a({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/decorators.html"}),"decorators"),"\nin ",Object(r.b)("inlineCode",{parentName:"p"},"tsconfig.json")," via:"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-json"}),'"experimentalDecorators": true\n')),Object(r.b)("p",null,"Then call ",Object(r.b)("inlineCode",{parentName:"p"},"MikroORM.init")," as part of bootstrapping your app:"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const orm = await MikroORM.init({\n  entities: [Author, Book, BookTag],\n  dbName: 'my-db-name',\n  clientUrl: '...', // defaults to 'mongodb://localhost:27017' for mongodb driver\n  baseDir: __dirname, // defaults to `process.cwd()`\n});\nconsole.log(orm.em); // access EntityManager via `em` property\n")),Object(r.b)("p",null,"You can also provide paths where you store your entities via ",Object(r.b)("inlineCode",{parentName:"p"},"entitiesDirs")," array. Internally\nit uses ",Object(r.b)("a",a({parentName:"p"},{href:"https://github.com/sindresorhus/globby"}),Object(r.b)("inlineCode",{parentName:"a"},"globby"))," so you can use\n",Object(r.b)("a",a({parentName:"p"},{href:"https://github.com/sindresorhus/globby#globbing-patterns"}),"globbing patterns"),". "),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const orm = await MikroORM.init({\n  entitiesDirs: ['./dist/app/**/entities'],\n  // ...\n});\n")),Object(r.b)("p",null,"You should provide list of directories, not paths to entities directly. If you want to do that\ninstead, you should use ",Object(r.b)("inlineCode",{parentName:"p"},"entities")," array and use ",Object(r.b)("inlineCode",{parentName:"p"},"globby")," manually:"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"import globby from 'globby';\n\nconst orm = await MikroORM.init({\n  entities: await globby('./dist/app/**/entities/*.js').map(require),\n  // ...\n});\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"You can pass additional options to the underlying driver (e.g. ",Object(r.b)("inlineCode",{parentName:"p"},"mysql2"),") via ",Object(r.b)("inlineCode",{parentName:"p"},"driverOptions"),".\nThe object will be deeply merged, overriding all internally used options.")),Object(r.b)("h2",{id:"entity-discovery-in-typescript"},"Entity Discovery in TypeScript"),Object(r.b)("p",null,"Internally, ",Object(r.b)("inlineCode",{parentName:"p"},"MikroORM")," uses ",Object(r.b)("a",a({parentName:"p"},{href:"/docs/v3-new/docs/metadata-cache"}),"performs analysis")," of source files of entities\nto sniff types of all properties. This process can be slow if your project contains lots of\nfiles. To speed up the discovery process a bit, you can provide more accurate paths where your\nentity source files are: "),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const orm = await MikroORM.init({\n  entitiesDirs: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`\n  entitiesDirsTs: ['./src/entities'], // path to your TS entities (source), relative to `baseDir`\n  // ...\n});\n")),Object(r.b)("h2",{id:"setting-up-the-commandline-tool"},"Setting up the Commandline Tool"),Object(r.b)("p",null,"MikroORM ships with a number of command line tools that are very helpful during development,\nlike Schema Generator and Entity Generator. You can call this command from the NPM binary\ndirectory or use ",Object(r.b)("inlineCode",{parentName:"p"},"npx"),":"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-sh"}),"$ node node_modules/.bin/mikro-orm\n$ npx mikro-orm\n\n# or when installed globally\n$ mikro-orm\n")),Object(r.b)("p",null,"For CLI to be able to access your database, you will need to create ",Object(r.b)("inlineCode",{parentName:"p"},"mikro-orm.config.js")," file that\nexports your ORM configuration. TypeScript is also supported, just enable ",Object(r.b)("inlineCode",{parentName:"p"},"useTsNode")," flag in your\n",Object(r.b)("inlineCode",{parentName:"p"},"package.json")," file. There you can also set up array of possible paths to ",Object(r.b)("inlineCode",{parentName:"p"},"mikro-orm.config")," file,\nas well as use different file name:"),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},Object(r.b)("inlineCode",{parentName:"strong"},"./package.json"))),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-json"}),'{\n  "name": "your-app",\n  "dependencies": { ... },\n  "mikro-orm": {\n    "useTsNode": true,\n    "configPaths": [\n      "./src/mikro-orm.config.ts",\n      "./dist/mikro-orm.config.js"\n    ]\n  }\n}\n')),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},Object(r.b)("inlineCode",{parentName:"strong"},"./src/mikro-orm.config.ts"))),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"// usually you will reexport existing configuration from somewhere else\nimport { CONFIG } from './config';\nexport = CONFIG.orm;\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"You can also use different names for this file, simply rename it in the ",Object(r.b)("inlineCode",{parentName:"p"},"configPaths")," array\nyour in ",Object(r.b)("inlineCode",{parentName:"p"},"package.json"),". You can also use ",Object(r.b)("inlineCode",{parentName:"p"},"MIKRO_ORM_CLI")," environment variable with the path\nto override ",Object(r.b)("inlineCode",{parentName:"p"},"configPaths")," value.")),Object(r.b)("p",null,"Now you should be able to start using the CLI. All available commands are listed in the CLI help:"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-sh"}),"Usage: mikro-orm <command> [options]\n\nCommands:\n  mikro-orm cache:clear        Clear metadata cache\n  mikro-orm generate-entities  Generate entities based on current database schema\n  mikro-orm schema:create      Create database schema based on current metadata\n  mikro-orm schema:drop        Drop database schema based on current metadata\n  mikro-orm schema:update      Update database schema based on current metadata\n\nOptions:\n  -v, --version  Show version number                                   [boolean]\n  -h, --help     Show help                                             [boolean]\n\nExamples:\n  mikro-orm schema:update --run  Runs schema synchronization\n")),Object(r.b)("h2",{id:"request-context"},"Request Context"),Object(r.b)("p",null,"Then you will need to fork Entity Manager for each request so their identity maps will not\ncollide. To do so, use the ",Object(r.b)("inlineCode",{parentName:"p"},"RequestContext")," helper:"),Object(r.b)("pre",null,Object(r.b)("code",a({parentName:"pre"},{className:"language-typescript"}),"const app = express();\n\napp.use((req, res, next) => {\n  RequestContext.create(orm.em, next);\n});\n")),Object(r.b)("p",null,"More info about ",Object(r.b)("inlineCode",{parentName:"p"},"RequestContext")," is described ",Object(r.b)("a",a({parentName:"p"},{href:"/docs/v3-new/docs/identity-map#requestcontext-helper-for-di-containers"}),"here"),"."),Object(r.b)("p",null,"Now you can start ",Object(r.b)("a",a({parentName:"p"},{href:"/docs/v3-new/docs/defining-entities"}),"defining your entities")," (in one of the ",Object(r.b)("inlineCode",{parentName:"p"},"entitiesDirs")," folders)."))}p.isMDXComponent=!0},233:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return b}));var r=t(0),a=t.n(r),o=a.a.createContext({}),i=function(e){var n=a.a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},s=function(e){var n=i(e.components);return a.a.createElement(o.Provider,{value:n},e.children)};var l="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},c=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===n.indexOf(r)&&(t[r]=e[r]);return t}(e,["components","mdxType","originalType","parentName"]),c=i(t),b=r,m=c[s+"."+b]||c[b]||p[b]||o;return t?a.a.createElement(m,Object.assign({},{ref:n},l,{components:t})):a.a.createElement(m,Object.assign({},{ref:n},l))}));function b(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=c;var s={};for(var p in n)hasOwnProperty.call(n,p)&&(s[p]=n[p]);s.originalType=e,s[l]="string"==typeof e?e:r,i[1]=s;for(var b=2;b<o;b++)i[b]=t[b];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}c.displayName="MDXCreateElement"}}]);
