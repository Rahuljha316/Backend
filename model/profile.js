const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{
        type: String
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        trim: true,
        required:true

    },  
    password:{
        type: String,
        select:true     

    },
    confirmPassword: {
        type: String
    },
    active:{
        type: Boolean,
        default:true
    },
    profileImage: {
        type: String,

    },
    bio: {
        type: String,
    }
},{timestamps:true})




module.exports = mongoose.model('Profile',profileSchema)