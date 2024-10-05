const { Admin } = require('../db/index.model');

// Midlleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // you need to check for the exact headers and validate the admin from the admin DB
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({
        username: username,
        password: password
    })
    .then(function(value) {
        if(value) {
            next();
        } else {
            res.status(403).json({
                msg: 'User doesnt exist'
            })
        }
    })
}

module.exports = adminMiddleware;