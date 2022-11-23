const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    followee: {
        type: String,
        required: true,

    },
    follower: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Connection', connectionSchema);