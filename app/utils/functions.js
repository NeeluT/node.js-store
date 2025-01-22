const createError = require("http-errors")
const JWT = require("jsonwebtoken")
const { UserModel } = require("../models/users")
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = require("../utils/constants")


function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}
function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findById(userId)
            const payload = {
                mobile : user.mobile,
            }
            const options = {
                expiresIn : "1h"
            }
            JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (err, token) => {
                if(err) reject(createError.InternalServerError("Server Error"))
                resolve(token)
            })
        } catch {
            reject(createError.InternalServerError("An error occurred while signing the token"));
        }
    })
}
function signRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await UserModel.findById(userId)
            const payload = {
                mobile : user.mobile,
            }
            const options = {
                expiresIn : "1y"
            }
            JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (err, token) => {
                if(err) reject(createError.InternalServerError("Server Error"))
                resolve(token)
            })
        } catch {
            reject(createError.InternalServerError("An error occurred while signing the token"));
        }
    })
}

module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken
}