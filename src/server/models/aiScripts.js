const mongoose = require('mongoose')

const aiScriptSchema = new mongoose.Schema({
    name: String,
    script: String
})

const AiScript = mongoose.model('AiScript', aiScriptSchema, 'aiScripts')

module.exports({ AiScript })
