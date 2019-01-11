# ba-node-express-graphql-app
Back end node express GraphQL App!!

## dependencies (installed using npm or yarn in the project)
- express
- express-graphql
- graphql
- lodash
- json-server
- axios
- nodemon (avoid re-running the server every time we make a change and more!!)

## url to see the server with graphql debugging tool
- http://localhost:4000/graphql

## json server (https://github.com/typicode/json-server)
Allows us avoid hardcoded data and access a server wirh some data. So that we need to make a request (more realistic cenario). Separated and decouple server.
- get all users: http://localhost:3000/users
- get all companies: http://localhost:3000/companies
- get all users that work in a specific company (json server working behind the cenes because we added companyId to the users): http://localhost:3000/companies/2/users

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