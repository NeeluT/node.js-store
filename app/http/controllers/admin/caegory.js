const {categoryController} = require("./category.controller")

const router = require("express").Router()
/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: create a new category title
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  required: true
 *                  name: title
 *              -   in: formData
 *                  type: string
 *                  required: false
 *                  name: parent
 *          responses:
 *              201:
 *                  description: success
 */
router.post("/add", categoryController.addCategory)
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of categories
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/parents", categoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all children of parent category
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/children/:parent", categoryController.getChildOfParents)
router.get("/all", categoryController.getAllCategory)
module.exports = {
    CategoryRoutes : router
}