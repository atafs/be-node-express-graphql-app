/*
Contains all of the knowledge required to tell graphql what our app data looks like
- what properties each object has
- how each object is related with each other
*/
const graphql = require('graphql')
const axios = require('axios')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql

// properties
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        console.log('ParentValue and Args', parentValue, args)
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => {
            console.log(`GET /companies/${parentValue.id}/users`, res.data)
            return res.data
          })
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  //required
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log('ParentValue and Args', parentValue, args)
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => {
            console.log(`GET /companies/:id`, res.data)
            return res.data
          })
      }
    }
  })
})

// enter into the graph in a specific node in our data (graph)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      // get the data we want
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(resp => {
            console.log('GET /users/:id', resp.data)
            return resp.data
          })
      }
    },
    company: {
      type: CompanyType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(resp => {
            console.log('GET /companies/:id', resp.data)
            return resp.data
          })
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        // GraphQLNonNull: means this is required
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, age, companyId }) {
        return axios
          .post(`http://localhost:3000/users`, { firstName, age, companyId })
          .then(res => {
            console.log('POST /users/', res.data)
            res.data
          })
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/users/${id}`, { id })
          .then(res => {
            console.log('DELETE /users/:id', res.data)
            res.data
          })
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/users/${args.id}`, args)
          .then(res => {
            console.log('PATCH /users/:id', res.data)
            res.data
          })
      }
    }
  }
})

// define the schema and export it to be available all over the app
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
