const mongoose = require('mongoose');

// Issue Schema

let issueShema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps : true });


let Issue = mongoose.model('Issue', issueShema);


module.exports = Issue; 