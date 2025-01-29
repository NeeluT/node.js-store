const createError = require("http-errors")
const {getOtpSchema, checkOtpSchema} = require("../../../validators/user/auth.schema")
const {UserModel} = require("../../../../models/users")
const { randomNumberGenerator, signAccessToken, signRefreshToken } = require("../../../../utils/functions")
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants")
const Controller = require("../../controller")
const { verifyRefreshToken } = require("../../../middlewares/VerifyAccessToken")

class UserAuthController extends Controller {
    async getOtp(req, res, next) {
        await getOtpSchema.validateAsync(req.body)
        const {mobile} = req.body
        const code = randomNumberGenerator()
        const result = await this.saveUser(mobile, code)
        if(!result) throw createError.Unauthorized("Login Failed")
        return res.status(200).send({
        data : {
            statusCode: 200,
            message: "New Code was sent to your phone",
            code,
            mobile
    }})
    } catch(error) {
        next(createError.BadRequest(error.message))
    }
    async checkOtp(req, res, next) {
        try {
            await checkOtpSchema.validateAsync(req.body)
            const {mobile, code} = req.body
            const user = await UserModel.findOne({mobile})
            if(!user) throw createError.NotFound("User not found")
            if(user.otp.code != code) throw createError.Unauthorized("Incorrect code")
            const now = Date.now()
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("Code has expired")
            const accessToken = await signAccessToken(user._id)
            const refreshToken = await signRefreshToken(user._id)
        console.log("accessToken");
            return res.json({
                data : {
                    accessToken,
                    refreshToken
                }
            })
        } catch(error) {
            next(error)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const {refreshToken} = req.body
            const mobile = await verifyRefreshToken(refreshToken)
            const user = await UserModel.findOne({mobile})
            const accessToken = await signAccessToken(user._id)
            const newRefreshToken = await signRefreshToken(user._id)
            return res.json({
                data : {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch(error) {
            next(error)
        }
    }
    async saveUser(mobile, code) {
        let otp = {
            code,
            expiresIn: new Date().getTime( + 120000),
        }
        const result = await this.checkExistUser(mobile)
        if(result) {
            return (await this.updateUser(mobile, {otp}))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            roles: [USER_ROLE]
            }))
    }
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({mobile})
        return !!user
    }
    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key=> {
            if(["", " ", 0, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile}, {$set : objectData})
        return !!updateResult.modifiedCount
    }
}

module.exports = {
    UserAuthController : new UserAuthController()
}