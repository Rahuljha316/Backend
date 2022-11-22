const {  Router } = require('express')
const { getAllFollowers, getAllFollowing } = require('../controllers/connection.controller')

const router = Router();

router.get('/', getAllFollowers); 
router.get('/', getAllFollowing); 

module.exports = router;
