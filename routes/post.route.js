const express = require('express')
const router = express.Router();
const  { addPost,editPostCaption, getPostById } = require('../controllers/post.controller')



router.post('/', addPost );
router.put('/:id', editPostCaption);
router.get('/:id', getPostById);

module.exports = router;