const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ripking00:courseappyush@cluster0.bkon0pw.mongodb.net/');

const AdminSchema = mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    purchasedCourse : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const CourseSchema = mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String
})

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {Admin, User, Course}