const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

    },
    active:{
        type: Boolean,
        default:true
    },
    image: Array
},{timestamps:true})


module.exports = mongoose.model('User',userSchema)