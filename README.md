# ba-node-express-graphql-app
Back end node express GraphQL App!!

## dependencies (installed using npm or yarn in the project)
- express
- express-graphql
- graphql
- lodash

## url to see the server with graphql debugging tool
- http://localhost:4000/graphql

## handle error messages
#### error01
- message: "GraphQL middleware options must contain a schema."
- solution: This is a middleware error. Using app.use() we are hooking middleware into our app. But graphql required a schema to be associated to it!!