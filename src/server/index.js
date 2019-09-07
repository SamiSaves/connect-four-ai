const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const { schema } = require('./graphql/schema')

const app = express()
app.use(cors())

const rootValue = {
    createAiScript: ({ name, script }) => {
        console.log('Creating script: ', name, script)
        return { name, script, _id: 'newid' }
    },
    updateAiScript: ({ id, script }) => {
        console.log('Updating script: ', script)
        return { script, name: 'test123', _id: id }
    },
    createGame: ({ name }) => {
        console.log('Creating a game', name)
        return { name, _id: 'testid', pieces: [] }
    },
    insertPiece: ({ id, column, color }) => {
        console.log('Inserting a piece', color, column)
        return { name: 'testGame', _id: id, pieces: [ { position: { col: column, row: 0 }, color } ] }
    }
}

app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }))

const port = process.env.PORT || 3000
app.listen(port)
console.log(`Server started at port ${port}`)