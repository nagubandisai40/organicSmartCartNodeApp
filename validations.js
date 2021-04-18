const Joi = require('@hapi/joi')


const registerValidation = (data)=>{
    const schema = Joi.object({
        userName: Joi.string().max(40).required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        firstName: Joi.string().required().max(30),
        lastName: Joi.string().required().max(30),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        address: Joi.string().required(),
    })    
    return schema.validate(data)
}

const loginValidation = (data)=>{
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6) 
    })
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation