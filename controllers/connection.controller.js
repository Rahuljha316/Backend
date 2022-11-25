const Connection = require('../model/connection');



const getAllFollowers = async (req,res) =>{

    
    const { username } = req.params;
    const follower = await Connection.find({followee: username});

    
    res.send(follower);
     

}

const getAllFollowing = async(req,res) =>{
    const {username} = req.params;
    const following = await Connection.find({ follower: username})

    res.send(following)
}


module.exports = {
    getAllFollowers,
    getAllFollowing

}