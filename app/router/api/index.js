const homeController = require("../../http/controllers/api/home.controller")
const router = require("express").Router()
const {verifyAccessToken} = require("../../http/middlewares/VerifyAccessToken")
/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description: Index page routes and info
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: Base route
 *      tags: [IndexPage]
 *      description: Get all data for home page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken...
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 */
router.get("/",verifyAccessToken, homeController.indexPage)
module.exports = {
    HomeRoutes : router
}


