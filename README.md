# ba-node-express-graphql-app
Back end node express GraphQL App!!

## dependencies (installed using npm or yarn in the project)
- express
- express-graphql
- graphql
- lodash
- json-server

## url to see the server with graphql debugging tool
- http://localhost:4000/graphql

## json server
Allows us avoid hardcoded data and access a server wirh some data. So that we need to make a request (more realistic cenario). Separated and decouple server.
url to get all users: http://localhost:3000/users
https://github.com/typicode/json-server

## handle error messages
#### error01
- message: "GraphQL middleware options must contain a schema."
- solution: Using app.use() we are hooking middleware into our app. But graphql required a schema to be associated to it!!

## queries is graphql
#### query01
{
  user(id: "23") {
    id,
    firstName,
    age
  }
}

#### query02
{
  user(id: "23") {
    firstName
  }
}