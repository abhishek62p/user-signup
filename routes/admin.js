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
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })
    console.log(`user: ${user}`)
    if (user) {
        const token = jwt.sign({
            username
        }, JWT_SECRET);
        res.json({
            token
        })
    } else {
        res.status(411).json({
            msg: 'Incorrect email and password'
        })
    }
})

router.get('/course', async (req, res) => {
    // Implement listing all course logic
    const response = await Course.find({});
    console.log(`Courses : ${response}`);
    res.json({
        Courses: response
    })
})

router.post('/courses/', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod for input validation

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse)
    res.json({
        msg: 'COurse created successfully', courseid: newCourse._id
    })
})

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement feching all course logic
    const response = await Course.find({})
    console.log(response)
    res.json({
        courses: response
    })
})

module.exports = router;