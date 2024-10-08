const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Midlleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // you need to check for the exact headers and validate the admin from the admin DB
    const token = req.headers.authorization;
    const words  = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

    console.log(`words: ${words}`)
    console.log(`jwt token: ${jwtToken}`)
    console.log(`decodedValue: ${decodedValue}`)
    if (decodedValue.username) {
        console.log(`decodedValue: ${decodedValue.username}`)
        next();
    } else {
        res.status(403).json({
            msg: 'You are not Authenthicated'
        })
    }
}

module.exports = adminMiddleware;