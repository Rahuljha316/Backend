const {  Router } = require('express')
const { getAllFollowers, getAllFollowing } = require('../controllers/connection.controller')

const router = Router();

router.get('/followers/:username', getAllFollowers); 
router.get('/following/:username', getAllFollowing); 

module.exports = router;
