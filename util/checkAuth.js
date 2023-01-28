const jwt = require('jsonwebtoken')

// for auth/middleware
const checkAuth = (req, res, next) => {
    if (!req.headers.authorization){
        return res.status(401).json({msg: "You are not authorized"})
    }
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SUPER_SECRET)
    console.log(decoded)
    req.userInfo = {
        user_id: decoded.user_id,
        username: decoded.username,
    }
    next()
}

module.exports = checkAuth