const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    followee: {
        type: mongoose.Types.ObjectId,
        required: true,

    },
    follower: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Connection', connectionSchema);