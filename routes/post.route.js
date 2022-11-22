const express = require('express')
const router = express.Router();
const  { addPost,editPostCaption, getPostById, deletePost } = require('../controllers/post.controller')



router.post('/', addPost );
router.put('/:id', editPostCaption);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);

module.exports = router;