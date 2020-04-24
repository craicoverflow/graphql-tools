(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{151:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return s})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(1),r=n(9),o=(n(0),n(169)),s={id:"schema-delegation",title:"Schema delegation",description:"Forward queries to other schemas automatically"},i={id:"schema-delegation",title:"Schema delegation",description:"Forward queries to other schemas automatically",source:"@site/docs/schema-delegation.md",permalink:"/docs/schema-delegation",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/schema-delegation.md",sidebar:"someSidebar",previous:{title:"Directive resolvers",permalink:"/docs/directive-resolvers"},next:{title:"Remote schemas",permalink:"/docs/remote-schemas"}},c=[{value:"Motivational example",id:"motivational-example",children:[]},{value:"API",id:"api",children:[{value:"delegateToSchema",id:"delegatetoschema",children:[]}]}],l={rightToc:c};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Schema delegation is a way to automatically forward a query (or a part of a query) from a parent schema to another schema (called a ",Object(o.b)("em",{parentName:"p"},"subschema"),") that is able to execute the query. Delegation is useful when the parent schema shares a significant part of its data model with the subschema. For example:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"A GraphQL gateway that connects multiple existing endpoints together, each with its own schema, could be implemented as a parent schema that delegates portions of queries to the relevant subschemas."),Object(o.b)("li",{parentName:"ul"},"Any local schema can directly wrap remote schemas and optionally extend them with additional fields. As long as schema delegation is unidirectional, no gateway is necessary. Simple examples are schemas that wrap other autogenerated schemas (e.g. Postgraphile, Hasura, Prisma) to add custom functionality.")),Object(o.b)("p",null,"Delegation is performed by one function, ",Object(o.b)("inlineCode",{parentName:"p"},"delegateToSchema"),", called from within a resolver function of the parent schema. The ",Object(o.b)("inlineCode",{parentName:"p"},"delegateToSchema")," function sends the query subtree received by the parent resolver to the subschema that knows how to execute it. Fields for the merged types use the ",Object(o.b)("inlineCode",{parentName:"p"},"defaultMergedResolver")," resolver to extract the correct data from the query response."),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"graphql-tools")," package provides several related tools for managing schema delegation:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/remote-schemas/"}),"Remote schemas")," - turning a remote GraphQL endpoint into a local schema"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/schema-transforms/"}),"Schema transforms")," - modifying existing schemas to make delegation easier"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"/docs/schema-stitching/"}),"Schema stitching")," - merging multiple schemas into one")),Object(o.b)("h2",{id:"motivational-example"},"Motivational example"),Object(o.b)("p",null,"Let's consider two schemas, a subschema and a parent schema that reuses parts of a subschema. While the parent schema reuses the ",Object(o.b)("em",{parentName:"p"},"definitions")," of the subschema, we want to keep the implementations separate, so that the subschema can be tested independently, or even used as a remote service."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-graphql"}),"# Subschema\ntype Repository {\n  id: ID!\n  url: String\n  issues: [Issue]\n  userId: ID!\n}\n\ntype Issue {\n  id: ID!\n  text: String!\n  repository: Repository!\n}\n\ntype Query {\n  repositoryById(id: ID!): Repository\n  repositoriesByUserId(id: ID!): [Repository]\n}\n\n# Parent schema\ntype Repository {\n  id: ID!\n  url: String\n  issues: [Issue]\n  userId: ID!\n  user: User\n}\n\ntype Issue {\n  id: ID!\n  text: String!\n  repository: Repository!\n}\n\ntype User {\n  id: ID!\n  username: String\n  repositories: [Repository]\n}\n\ntype Query {\n  userById(id: ID!): User\n}\n")),Object(o.b)("p",null,"Suppose we want the parent schema to delegate retrieval of repositories to the subschema, in order to execute queries such as this one:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-graphql"}),'query {\n  userById(id: "1") {\n    id\n    username\n    repositories {\n      id\n      url\n      user {\n        username\n        id\n      }\n      issues {\n        text\n      }\n    }\n  }\n}\n')),Object(o.b)("p",null,"The resolver function for the ",Object(o.b)("inlineCode",{parentName:"p"},"repositories")," field of the ",Object(o.b)("inlineCode",{parentName:"p"},"User")," type would be responsible for the delegation, in this case. While it's possible to call a remote GraphQL endpoint or resolve the data manually, this would require us to transform the query manually, or always fetch all possible fields, which could lead to overfetching. Delegation automatically extracts the appropriate query to send to the subschema:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-graphql"}),"# To the subschema\nquery($id: ID!) {\n  repositoriesByUserId(id: $id) {\n    id\n    url\n    issues {\n      text\n    }\n  }\n}\n")),Object(o.b)("p",null,"Delegation also removes the fields that don't exist on the subschema, such as ",Object(o.b)("inlineCode",{parentName:"p"},"user"),". This field would be retrieved from the parent schema using normal GraphQL resolvers."),Object(o.b)("p",null,"Each field on the ",Object(o.b)("inlineCode",{parentName:"p"},"Repository")," and ",Object(o.b)("inlineCode",{parentName:"p"},"Issue")," types should use the ",Object(o.b)("inlineCode",{parentName:"p"},"defaultMergedResolver")," to properly extract data from the delegated response. Although in the simplest case, the default resolver can be used for the merged types, ",Object(o.b)("inlineCode",{parentName:"p"},"defaultMergedResolver")," resolves aliases, converts custom scalars and enums to their internal representations, and maps errors."),Object(o.b)("h2",{id:"api"},"API"),Object(o.b)("h3",{id:"delegatetoschema"},"delegateToSchema"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"delegateToSchema")," method should be called with the following named options:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"delegateToSchema(options: {\n  schema: GraphQLSchema;\n  operation: 'query' | 'mutation' | 'subscription';\n  fieldName: string;\n  args?: Record<string, any>;\n  context: Record<string, any>;\n  info: GraphQLResolveInfo;\n  transforms?: Array<Transform>;\n}): Promise<any>\n")),Object(o.b)("h4",{id:"schema-graphqlschema"},"schema: GraphQLSchema"),Object(o.b)("p",null,"A subschema to delegate to."),Object(o.b)("h4",{id:"operation-query--mutation--subscription"},"operation: 'query' | 'mutation' | 'subscription'"),Object(o.b)("p",null,"The operation type to use during the delegation."),Object(o.b)("h4",{id:"fieldname-string"},"fieldName: string"),Object(o.b)("p",null,"A root field in a subschema from which the query should start."),Object(o.b)("h4",{id:"args-recordstring-any"},"args: Record<string, any>"),Object(o.b)("p",null,"Additional arguments to be passed to the field. Arguments passed to the field that is being resolved will be preserved if the subschema expects them, so you don't have to pass existing arguments explicitly, though you could use the additional arguments to override the existing ones. For example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-graphql"}),"# Subschema\n\ntype Booking {\n  id: ID!\n}\n\ntype Query {\n  bookingsByUser(userId: ID!, limit: Int): [Booking]\n}\n\n# Schema\n\ntype User {\n  id: ID!\n  bookings(limit: Int): [Booking]\n}\n\ntype Booking {\n  id: ID!\n}\n")),Object(o.b)("p",null,"If we delegate at ",Object(o.b)("inlineCode",{parentName:"p"},"User.bookings")," to ",Object(o.b)("inlineCode",{parentName:"p"},"Query.bookingsByUser"),", we want to preserve the ",Object(o.b)("inlineCode",{parentName:"p"},"limit")," argument and add a ",Object(o.b)("inlineCode",{parentName:"p"},"userId")," argument by using the ",Object(o.b)("inlineCode",{parentName:"p"},"User.id"),". So the resolver would look like the following:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"const resolvers = {\n  User: {\n    bookings(parent, args, context, info) {\n      return delegateToSchema({\n        schema: subschema,\n        operation: 'query',\n        fieldName: 'bookingsByUser',\n        args: {\n          userId: parent.id,\n        },\n        context,\n        info,\n      });\n    },\n    ...\n  },\n  ...\n};\n")),Object(o.b)("h4",{id:"context-recordstring-any"},"context: Record<string, any>"),Object(o.b)("p",null,"GraphQL context that is going to be passed to the subschema execution or subsciption call."),Object(o.b)("h4",{id:"info-graphqlresolveinfo"},"info: GraphQLResolveInfo"),Object(o.b)("p",null,"GraphQL resolve info of the current resolver. Provides access to the subquery that starts at the current resolver."),Object(o.b)("h4",{id:"transforms-array-transform-"},"transforms: Array< Transform >"),Object(o.b)("p",null,"Any additional operation ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/schema-transforms/"}),"transforms")," to apply to the query and results. Could be the same operation transforms used in conjunction with schema transformation. For convenience, after schema transformation, ",Object(o.b)("inlineCode",{parentName:"p"},"transformedSchema.transforms")," contains the transforms that were applied."))}p.isMDXComponent=!0},169:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=r.a.createContext({}),p=function(e){var t=r.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i({},t,{},e)),n},u=function(e){var t=p(e.components);return r.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(n),m=a,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?r.a.createElement(h,i({ref:t},l,{components:n})):r.a.createElement(h,i({ref:t},l))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=n[l];return r.a.createElement.apply(null,s)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);