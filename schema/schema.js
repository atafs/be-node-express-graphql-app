/*
Contains all of the knowledge required to tell graphql what our app data looks like
- what properties each object has
- how each object is related with each other
*/
const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

// hardcoded list of users
const users = [
    {
        id: '23',
        firstName: 'Americo',
        age: 39
    },
    {
        id: '47',
        firstName: 'Hugo',
        age: 2
    }
];

// properties of the user type
const UserType = new GraphQLObjectType({
    //required
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

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
                return _.find(users, { id: args.id });
            }
        }
    }
});

// define the schema and export it to be available all over the app
module.exports = new GraphQLSchema({
    query: RootQuery
});