const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().required().min(1).max(20),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.ref("password")
})

const loginSchema = Joi.object({
    username: Joi.string().min(1).max(20),
    email: Joi.string().email(),
    password: Joi.string().min(1).required(),
})

module.exports = { registerSchema, loginSchema }