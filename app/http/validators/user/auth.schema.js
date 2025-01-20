const Joi = require("@hapi/joi")
const getOtpSchema = Joi.object({
    mobile : Joi.string().pattern(/^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/)
})
const checkOtpSchema = Joi.object({
    mobile : Joi.string().pattern(/^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/),
    code: Joi.string().min(4).max(6).error(new Error("Incorrect code"))
})

module.exports = {
    getOtpSchema,
    checkOtpSchema
}