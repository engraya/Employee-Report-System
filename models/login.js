const mongoose = require('mongoose');


const loginSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


let Login = mongoose.model('Login', loginSchema);

module.exports = Login;