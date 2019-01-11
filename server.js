// express related code
const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

//graphiql: development tool that alows us to make queries against our development server
app.use('/graphql', expressGraphQL({
    schema, 
    graphiql: true
}));

app.listen(4000, () => {
    console.log('listening to port 4000...');
});
