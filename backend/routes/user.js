const { Router } = require("express");
const { User, Course } = require("../database/db");
const router = Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('D:/Dev/week-7/week-7 course app/backend/config.js');
const userMiddleware = require("../middleware/userMiddleware");

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })
    res.json({
        msg: "User created successfully"
    })
})

router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username: username,
        password: password
    })
    if (user) {
        const token = jwt.sign({ username }, JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.status(404).json({
            msg: "incorrect email and password"
        })
    }
})

router.get('/courses', async (req, res) => {
    const response = await Course.find({})

    res.json({
        courses: response
    })
})

router.post('/courses/:courseId',userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    const username = decodedValue.username;

    await User.updateOne({
        username: username
    },{
        "$push":{
            purchasedCourse: courseId
        }
    })

    res.json({
        msg: "Purchased successfully"
    })
})

router.get('/purchasedCourses',userMiddleware, async (req, res) => {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];

    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    const username = decodedValue.username;

    const user = await User.findOne({
        username: username,
    })

    console.log(user.purchasedCourse);

    const courses = await Course.findOne({
        _id: {
            "$in": user.purchasedCourse
        }
    })

    res.json({
        courses: courses
    })
})


module.exports = router