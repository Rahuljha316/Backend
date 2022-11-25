const express = require('express')
const router = express.Router();
const  { addPost,editPostCaption, getPostById, deletePost } = require('../controllers/post.controller');
const Auth = require('../middlewares/auth')



router.post('/',Auth, addPost );
router.put('/:id',Auth, editPostCaption);
router.get('/:id', getPostById);
router.delete('/:id',Auth, deletePost);

module.exports = router;