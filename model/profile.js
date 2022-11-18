const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bio:{
        type: String,
        trim: true
    },
    name:{
        type:String
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    birthday:{
        type: Date,

    },
    gender:{
        type: String

    },
    
    
})

module.exports = mongoose.model('Profile', profileSchema);
