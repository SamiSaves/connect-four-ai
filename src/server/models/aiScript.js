const mongoose = require('mongoose')

const aiScriptSchema = new mongoose.Schema({
    name: String,
    script: String
})

aiScriptSchema.statics.findAiScript = async id => {
    return await AiScript.findOne({ _id: id })
}

aiScriptSchema.statics.createAiScript = async (name, script) => {
    const aiScript = new AiScript({ name, script })
    return await aiScript.save()
}

aiScriptSchema.statics.updateAiScript = async (id, script) => {
    return await AiScript.findByIdAndUpdate(id, { script }).exec()
}

const AiScript = mongoose.model('AiScript', aiScriptSchema, 'aiScripts')

module.exports = { AiScript }
