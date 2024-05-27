const {Router} = require('express');
const { Admin, Course } = require('../database/db');
const router = Router()
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('D:/Dev/week-7/week-7 course app/backend/config.js');
const adminMiddleware = require('../middleware/adminMiddleware');



router.post("/signup", async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg: "Admin created successfully"
    })
})

router.post("/signin", async (req, res)=>{
    const username= req.body.username;
    const password= req.body.password;

    const admin = await Admin.findOne({
        username: username,
        password: password
    })
    if(admin){
        const token = jwt.sign({username}, JWT_SECRET)

        res.json({
            token: token
        })
    }else{
        res.status(404).json({
            msg: "incorrect email and password"
        })
    }
})

router.post("/addCourse", adminMiddleware, async (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })
    res.json({
        msg: "Course created successfully"
    })
})

router.get("/courses", async (req, res)=>{
    const response = await Course.find({})

    res.json({
        courses: response
    })
})


module.exports = router;