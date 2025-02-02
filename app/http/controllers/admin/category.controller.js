const createError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const { addCategorySchema } = require("./category.schema");

class categoryController extends Controller {
    async addCategory(req, res, next) {
        try {
            await addCategorySchema.validateAsync(req.body)
            const {title, parent} = req.body
            const category = await CategoryModel.create({title,parent})
            if(!category) throw createError.InternalServerError("Intenal Error")
                return res.status(201).json({
                    data: {
                        statusCode: 201,
                        message: "Category was added successfully"
                    }
            })
        } catch(error) {
            next(error)
        }
    }
    async removeCategory(req, res, next) {
        try {

        } catch(error) {
            next(error)
        }
    }
    async editCategory(req, res, next) {
        try {

        } catch(error) {
            next(error)
        }
    }
    async getAllCategory(req, res, next) {
        try {
            const category = await CategoryModel.aggregate([
                {
                    $lookup : {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                    $project : {
                        __v : 0,
                        "children.__v" : 0,
                        "children.parent" : 0
                    }
                }
            ])
            return res.status(200).json({
                data: {
                    category
                }
            })
        } catch(error) {
            next(error)
        }
    }
    async getCategoryById(req, res, next) {
        try {

        } catch(error) {
            next(error)
        }
    }
    async getAllParents(req, res, next) {
        try {
            const parents = await CategoryModel.find({parent: undefined}, {__v : 0})
            return res.status(200).json({
                parents
            })
        } catch(error) {
            next(error)
        }
    }
    async getChildOfParents(req, res, next) {
        try {
            const {parent} = req.body
            const children = await CategoryModel.find({parent}, {__v : 0, parent : 0})
            return res.status(200).json({
                data: {
                    children
                }
            })
        } catch(error) {
            next(error)
        }
    }
}

module.exports = {
    categoryController : new categoryController()
}