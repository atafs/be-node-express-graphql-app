## to continue

section 4: Fetching Data with Queries

# be-node-express-graphql-app

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

## queries is graphql

#### query01

```
{
  user(id: "27") {
    id,
    firstName,
    age
  }
}
```

#### query02

```
{
  user(id: "2") {
    firstName
  }
}
```

#### query03

```
{
  user(id: "39") {
    firstName
    company {
      id
      name
      description
    }
  }
}
```

#### query04

```
{
  company(id: "2") {
		name
  }
}
```

#### query05

```
{
  user(id: "39") {
    id,
    firstName,
    age,
    company {
      id
      name
      description
    }
  }
}
```

#### query06 (get away with circular queries as nested as we want to (not that we want to!!). e.g company)

```
{
  company(id: "2") {
    id
		name
    description
    users {
      id
      firstName
      age
      company {
        name
      }
    }
  }
}
```

#### query07 name a query to be more readable and reusable

```
query findCompany {
  company(id: "2") {
    id
		name
    description
    users {
      firstName
    }
  }
}
```

#### query08 name the response query with a key so that we can use the same query but for a different request

```
{
  apple: company(id: "1") {
    id
		name
    description
    users {
      firstName
    }
  }

  google: company(id: "2") {
    id
		name
    description
    users {
      firstName
    }
  }
}
```

#### query09 query fragments: list of a different properties we want to have access to!! Reducing the copy and paste of properties in our query!!

```
{
  apple: company(id: "1") {
    ...companyDetails
    users {
      firstName
    }
  }

  google: company(id: "2") {
    ...companyDetails
    users {
      firstName
    }
  }
}

fragment companyDetails on Company {
  id
  name
  description
}
```

#### query10 mutation to add a user

```
mutation {
  addUser(firstName: "Agrela", age: 78, companyId: "1") {
    id
    firstName
    age
  }
}
```

#### query11 mutation to delete a user

```
mutation {
  deleteUser(id: "99") {
    id
  }
}
```

#### query12 mutation to edit a user

```
mutation {
  editUser(id: "39", age: 39, firstName: "AmericoTomas") {
    id
    age
    firstName
  }
}
```

## handle error messages

#### error01

- message: "GraphQL middleware options must contain a schema."
- solution: Using app.use() we are hooking middleware into our app. But graphql required a schema to be associated to it!!

#### error02

- message: "UserType is not defined" when setting multi direction relationship in our graphQL
- solution: we are trying to access a variable that has not been defined yet (positioned wrong in the code). There is a circular reference because both variables need each other!! Wrap an arrow function in the fields object to solve it!! It is a JS error related with closure and closure scopes!!
