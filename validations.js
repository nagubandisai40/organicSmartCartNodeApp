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

const cartValidation = (data)=>{
    const schema = new Joi.object({
        userId: Joi.string().required(),
        productId: Joi.string().required(),
        
        
    })
    return schema.validate(data);
}

const productValidation = (data)=>{
    const schema = new Joi.object({
        productName: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required(),
        categoryId: Joi.number().required(),
        categoryName: Joi.string().required(),
        seller: Joi.string().required(),
        tags: Joi.string().required(),
        measuringUnit: Joi.string().required()
    })
    return schema.validate(data);
}

const historyValidation = (data)=>{
    const schema = new Joi.object({
        userId: Joi.string().required(),
        productId: Joi.string().required()
    })
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.productValidation = productValidation
module.exports.cartValidation = cartValidation
module.exports.historyValidation = historyValidation