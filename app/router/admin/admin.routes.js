const { CategoryRoutes } = require("../../http/controllers/admin/caegory")

const router = require("express").Router()

/**
 * @swagger
 *  tags:
 *      name: Admin-Panel
 *      description: Action of admin(add, remove, edit etc.)
 */


router.use("/category", CategoryRoutes)
module.exports = {
    AdminRoutes: router
}