const Joi = require("@hapi/joi")
const {MongoIDPattern} = require("../../../utils/constants")
const addCategorySchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("Invalid category title")),
    parent: Joi.string().allow("").pattern(MongoIDPattern).allow("").error(new Error("Entered parent is not valid"))
})


module.exports = {
    addCategorySchema
}