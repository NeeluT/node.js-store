const creatError = require("http-errors")
const JWT = require("jsonwebtoken")
const { UserModel } = require("../models/users")

function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}
function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId).then(res => res)
        const payload = {
            mobile : user.mobile,
            userID : user._id
        }
        const secret = ""
        const options = {
            expiresIn : "1h"
        }
        JWT.sign(payload,SECRET_KEY,options, (err, token) => {
            if(err) reject(creatError.InternalServerError("Server Error"))
            resolve(token)
        })
    })
}

module.exports = {
    randomNumberGenerator,
    signAccessToken
}