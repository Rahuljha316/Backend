const { Router} = require('express');
const { Register, signIn, searchUser, editUserDetails, searchUserByUsername } = require('../controllers/profile.controller')
const Auth = require('../middlewares/auth');

const router = Router();

router.post('/', Register);
router.post('/signIn', signIn);
router.get('/search/:searchQuery', searchUser);
router.get('/user/:username', searchUserByUsername);
router.put('/:id',Auth, editUserDetails);

module.exports = router;


