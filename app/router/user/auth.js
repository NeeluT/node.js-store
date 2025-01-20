const router = require("express").Router()
const {UserAuthController} = require("../../http/controllers/user/auth/auth.controller")
/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: Login user using phone number
 *          description: One time password (otp) login
 *          parameters:
 *          -   name: mobile
 *              description: US phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/login", UserAuthController.getOtp)

module.exports = {
    UserAuthRoutes : router
}