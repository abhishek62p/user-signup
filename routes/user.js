const { Router } = require('express');
const userMiddleware = require('../middleware/user');
const router = Router();
const { User, Course } = require('../db/index.model');

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    })
    res.json({
        msg: 'User created successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement the logic for purchased courses
})

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement feching all course logic
})

module.exports = router;