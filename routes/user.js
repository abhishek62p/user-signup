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

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    const x = User.updateOne({
        username: username
    }, {
        purchasedCourses: {
            "$push": courseId
        }
    });
    console.log(x);
    res.json({
        msg: 'Purchase complete'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement the logic for purchased courses
    const user = await User.findOne({
        username: req.headers.username
    });
    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            '$in': user.purchasedCourses
        }
    })
    res.json({
        courses: courses
    })
})

router.get('/courses', userMiddleware, async (req, res) => {
    // Implement feching all purchased course logic
    const response = await Course.find({});
    console.log(`Courses : ${response}`);
    res.json({
        Courses: response
    })
})

module.exports = router;