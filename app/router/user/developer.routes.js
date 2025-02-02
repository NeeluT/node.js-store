const router = require("express").Router()
const bcrypt = require("bcrypt")
const { randomNumberGenerator } = require("../../utils/functions")
/**
 * @swagger
 *  tags:
 *     name: Developer-Routes
 *     description: Developer utils
 */

/**
 * @swagger
 *  /developer/passwordhash/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: Hash data with bcrypt
 *          parameters:
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/passwordhash/:password", (req, res, next) => {
    const {password} = req.params
    const salt = bcrypt.genSaltSync(10)
    return res.send(bcrypt.hashSync(password, salt))
})

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: get random number
 *          responses:
 *              200:
 *                  description: success
 */
router.get("/random-number", (req, res, next) => {
    return res.send(randomNumberGenerator().toString())
})

module.exports = { 
    DeveloperRoutes : router
}