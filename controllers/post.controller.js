const Post = require('../model/post');
const Profile = require('../model/profile')
const Joi = require('@hapi/joi');


const addPostSchema = Joi.object({
    createdBy: Joi.string().min(3).required(),
    caption: Joi.string().min(3).optional(),
    location: Joi.string().min(3).optional(),
    hashtag: Joi.array().optional(),
    image: Joi.array().optional()

})
const editCaptionSchema = Joi.object({

    caption: Joi.string().min(3).optional(),
 
})


const addPost =  async(req,res) => {
    
    const {error} = await addPostSchema.validate(req.body)
    if(error) return res.send({ error })


    const {createdBy, caption, location, hashtag, image } = req.body
    const newPost = await Post.create({createdBy,caption, location, hashtag,image});

    res.status(201).json(newPost);


}

const editPostCaption =  async(req,res) => {

    const {error}= await editCaptionSchema.validate(req.body)
    if(error) return res.send({error})

    const {caption} = req.body;
    const { id }= req.params;
    const post = await Post.findByIdAndUpdate(id, { caption })

    if(!post) return res.status(404).send('the post with the given Id is not found..')
    res.send(post)

}


//todo
const getAllPostofUser =  async (req,res) => {
    const {id} = req.params;

    
}

const getPostById = async (req,res) => {
    const {id }= req.params;
    const post  = await Post.findById(id)
    
    if(!post) return res.status(404).send('the post with the given Id is not found');

    res.send(post)
}

const deletePost = async (req,res) => {

    const { id } = req.params;

    const post = await Post.findByIdAndRemove(id);
    if(!post) return res.status(404).send('the post with the given Id is not found');
    
}

module.exports =  {
    addPost,
    editPostCaption,
    getPostById,
    deletePost,
}