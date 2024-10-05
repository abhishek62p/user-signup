const mongoose = require('mongoose');
const { mongodbURL } = require('../config');
const { string } = require('zod');

// connect to MongooDB
mongoose.connect(mongodbURL)

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
    
}, { timestamps: true } );

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
});


const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}