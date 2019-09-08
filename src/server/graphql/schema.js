const { buildASTSchema } = require('graphql')
const gql = require('graphql-tag')
const { readFileSync } = require('fs')

const graphqlSchema = readFileSync(`${__dirname}/schema.graphql`, 'utf8')
const schema = buildASTSchema(gql(graphqlSchema))

module.exports = { schema }
