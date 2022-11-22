const { Router} = require('express');
const { Register, signIn, searchUser, editUserDetails, searchUserByUsername } = require('../controllers/profile.controller')

const router = Router();

router.post('/', Register);
router.post('/signIn', signIn);
router.get('/search/:searchQuery', searchUser);
router.get('/user/:username', searchUserByUsername);
router.put('/:id', editUserDetails);

module.exports = router;


