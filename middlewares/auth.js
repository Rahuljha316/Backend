const jwt = require('jsonwebtoken');

async function authenticateToken(req,res, next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return  res.sendStatus(401)

    const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    
    req.user = user
    next();
    
}


module.exports = authenticateToken