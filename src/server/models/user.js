const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        index: true
    }
})

userSchema.statics.findByUsername = async username => {
    return await User.findOne({ username })
}

userSchema.statics.registerUser = async username => {
    const user = new User({ username })
    return await user.save()
}

const User = mongoose.model('User', userSchema, 'users')

module.exports = { User }
