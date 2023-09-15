const mongoose = require('mongoose');

// Report Schema

let reportSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    message: {
        type: String,
    }
}, { timestamps : true });


let Report = mongoose.model('Report', reportSchema);


module.exports = Report; 