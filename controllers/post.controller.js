const Post = require('../model/post')

const addPost =  async(req,res) => {
    
    const {createdBy, caption, location, hashtag, image } = req.body
    const newPost = await Post.create({createdBy,caption, location, hashtag,image});

    res.status(201).json(newPost);

}
const editPostCaption =  async(req,res) => {
    const {caption} = req.body
    const { id, }= req.params;
    const post = await Post.findByIdAndUpdate(id, { caption })

    if(!post) return res.status(404).send('the post with the given Id is not found..')
    res.send(post)

}
const getPostByUserId =  (req,res) => {

}
const getPostById = async (req,res) => {
    const {id }= req.params;
    const post  = await Post.findById(id)
    
    if(!post) return res.status(404).send('the post with the given Id is not found');

    res.send(post)
}
const deletePost =  (req,res) => {

}

module.exports =  {
    addPost,
    editPostCaption,
    getPostById,



}