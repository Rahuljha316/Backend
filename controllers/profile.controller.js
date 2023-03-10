const Profile = require('../model/profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    name:Joi.string().min(3).required(),
    username:Joi.string().min(3).required(),
    email:Joi.string().min(3).required().email().lowercase(),
    password: Joi.string().min(3).required(),
    // confimPassword: Joi.string().valid(Joi.ref('password')).required()
    
});

const loginSchema = Joi.object({
    // name:Joi.string().min(3).required(),
    // username:Joi.string().min(3),
    email:Joi.string().min(3),
    password: Joi.string().min(3),
    
})

const editDetailSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    username: Joi.string().min(3).optional(),
    profileImage: Joi.string().min(3).optional(),
    bio: Joi.string().min(3).optional(),

})

const  checkDuplicateUsername = async (username) => {

    const existingProfile = await Profile.findOne({username})

    if(existingProfile) return true
    
    return false
      
}
const  checkDuplicateEmail = async (email) => {

    const existingProfile = await Profile.findOne( {email} )

    if(existingProfile) return true
    
    return false
      
}

function generateAuthToken(username,email){
    const token = jwt.sign(

        { username, email },
        process.env.ACCESS_TOKEN_SECRET,
        // {
        //   expiresIn: "2h",
        // }
      );    
      return token;
}


const Register = async (req,res) => {

    try{
        const { error } = await registerSchema.validate(req.body)

        if(error) return res.status(400).send({error})

        const { name, username, email, password, active, profileImage, bio } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const duplicateUsername = await checkDuplicateUsername(username);
    
        if(duplicateUsername){
            return res.status(403).send('username already exists')
        }

        const duplicateEmail = await checkDuplicateEmail(email);

        if(duplicateEmail) {
            return res.status(403).send('email already exists')
        }

        const user = new Profile({ name, username, email,password: hashedPassword, active, profileImage, bio });


        const token = generateAuthToken(user.username,user.email)


        const newUser = await user.save();
        //send jwt token


        res.status(200).send({token})
       
    }
    catch{

        res.status(500).send()
    }
   
};

const signIn = async(req,res) => {

    const {error} = await loginSchema.validate(req.body)
    
    if(error) return res.status(400).send({error})
    
    const { email, password } = req.body;

    const user= await Profile.findOne({ $or :[{username: email}, {email: email}]});
    
    if(!user) {

        return res.status(404).send({message: 'user is not found'})
    }

    try{
        const compare =  await bcrypt.compare(password , user.password)
 
        if (compare ){
            

            const token = generateAuthToken(user.username, user.email)

            return res.status(200).send({token})
        }
        
        return res.status(401).send({message: "password is incorrect "})

    }
    catch{
        res.status(500).send()
    }


}


const searchUser = async(req,res) => {

    const { searchQuery } = req.params;
    const searchedUsers = await Profile.find({ username : { $regex:'.*' + searchQuery + '.*'}  }).select({username:1, _id:0});

    if(!searchedUsers) return res.status(404).send({message: 'user not found'})
    res.send(searchedUsers);

}

const searchUserByUsername = async (req,res) => {

    const { username } = req.params

    const searchedUser = await Profile.findOne({username: username}).select('username email name profileImage bio');

    if(!searchedUser) return res.status(404).send({message: 'user not found'})
    res.send(searchedUser)

}


const editUserDetails = async (req,res) => {

   

    const {error} = await editDetailSchema.validate(req.body);

    if(error) return res.status(400).send({error})


    const { name,username, profileImage, bio } = req.body;
    const { id } = req.params;

    const updatedProfile = await Profile.findByIdAndUpdate(id,{name,username,bio,profileImage})

    if(!updatedProfile) return res.status(404).send({message: 'user not found'})


    res.send(updatedProfile);
    

}

module.exports = {
    Register, 
    signIn,
    searchUser,
    editUserDetails,
    searchUserByUsername,

}

