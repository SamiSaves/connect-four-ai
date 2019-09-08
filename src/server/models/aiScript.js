const mongoose = require('mongoose')

const aiScriptSchema = new mongoose.Schema({
  name: String,
  script: String,
})

aiScriptSchema.statics.findAiScript = async (id) => AiScript.findOne({ _id: id })

aiScriptSchema.statics.createAiScript = async (name, script) => {
  const aiScript = new AiScript({ name, script })
  return aiScript.save()
}

aiScriptSchema.statics.updateAiScript = (
  async (id, script) => AiScript.findByIdAndUpdate(id, { script }, { new: true }).exec()
)

const AiScript = mongoose.model('AiScript', aiScriptSchema, 'aiScripts')

module.exports = { AiScript }
