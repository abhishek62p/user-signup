const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const { Admin, Course, User } = require('../db/index.model')
const router = Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    // check wheather if user with this username is already exists if not then create a user
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement the logic of signin and use JWT for authenticaion
})

router.get('/course', (req, res) => {
    // Implement listing all course logic
})

router.post('/courses/', adminMiddleware, async (req, res) => {
    // Implement course creation logic
})

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement feching all course logic
})

module.exports = router;