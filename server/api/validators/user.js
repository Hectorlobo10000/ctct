const Joi = require('joi')

module.exports = (bodyRequest) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    mail: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    identity: Joi.string().min(13).max(13).required(),
    phone: Joi.string().min(8).max(8).required()
  }
  return Joi.validate(bodyRequest, schema)
} 