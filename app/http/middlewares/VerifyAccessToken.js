const createError = require("http-errors");
const { UserModel } = require("../../models/users");
const JWT = require("jsonwebtoken")
const {ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY} = require("../../utils/constants")


function verifyAccessToken(req, res, next) {
    const headers = req.headers
    const [bearer , token] = headers?.connection["access-token"]?.split(" ") || []
    console.log(headers);
    if(token && ["Bearer","bearer"].includes(bearer)) {
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) return next(createError.Unauthorized("Please Login"))
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile}, {password: 0,otp: 0})
            if(!user) return next(createError.Unauthorized("Account not found"))
            req.user = user
            return next()
        })
    }
    else return next(createError.Unauthorized("Please Login"))
}
function verifyRefreshToken(token) {
        return new Promise((resolve, reject) => {
            JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
            if(err) reject(createError.Unauthorized("Please Login"))
            const {mobile} = payload || {}
            const user = await UserModel.findOne({mobile}, {password: 0,otp: 0})
            if(!user) reject(createError.Unauthorized("Account not found"))
            const refreshToken = await redisClient.get(user._id)
            if(token === refreshToken) return resolve(mobile)
            reject(createError.Unauthorized("Please Login"))  
            resolve(mobile)
        })
    })
}

module.exports = {
    verifyAccessToken,
    verifyRefreshToken
}

