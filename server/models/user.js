var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
        username: String,
        password: String,
        email: String,
        gender: String,
        address: String
})

userSchema.methods.validPassword = function(password){
    return this.password == password
}

module.exports = mongoose.model('User', userSchema);