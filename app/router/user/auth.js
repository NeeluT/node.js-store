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
 *  /user/get-otp:
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
router.post("/get-otp", UserAuthController.getOtp)
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: check otp value in user controller
 *          description: check otp with code, mobile and expire time
 *          parameters:
 *          -   name: mobile
 *              description: US phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: code received from user
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
router.post("/check-otp", UserAuthController.checkOtp)
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token to het new token and refresh token
 *          description: resh token
 *          parameters:
 *          -   in: formData
 *              required: true
 *              type: string
 *              name: refreshToken
 *          responses:
 *              200:
 *                  description: success
 */
router.post("/refresh-token", UserAuthController.refreshToken)

module.exports = {
    UserAuthRoutes : router
}