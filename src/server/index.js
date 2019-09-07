const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildASTSchema } = require('graphql')
const gql = require('graphql-tag')
const cors = require('cors')

const app = express()
app.use(cors())

const schema = buildASTSchema(gql`
    type Query {
        hello: String
    }
`)

const rootValue = {
    hello: () => 'Hello world!',
    
}

app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server started at port ${port}`)