const { Schema, model } = require("mongoose");
const joi = require('joi')

// define the user model
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });


// create and export the user collection
exports.User = model('user', userSchema);

// joi validations
exports.validateUser = (body) => joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    gender: joi.string().valid('male', 'female').required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
}).validate(body);

exports.validateUserUpdate = (body) => joi.object({
    firstName: joi.string(),
    lastName: joi.string(),
    gender: joi.string().valid('male', 'female'),
    email: joi.string().email(),
    password: joi.string()
}).validate(body);

exports.validateLogin = (body) => joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
}).validate(body);