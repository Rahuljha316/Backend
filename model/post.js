const mongoose = require('mongoose');

const Profile = require('./profile')

const postSchema = new mongoose.Schema({
    createdBy:{
        type: mongoose.Types.ObjectId,

    },
    caption:{
        type: String,
        trim: true

    },
    location: {
        type: String,
    },
    hashtag: Array,
    image: Array,
    
});

module.exports = mongoose.model('Post', postSchema);