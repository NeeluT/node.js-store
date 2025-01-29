const { HomeRoutes } = require("./api/index")
const { UserAuthRoutes } = require("./user/auth")

// (async() => {
//     try { 
//         await redisClient.set("key","value")
//         const value = await redisClient.get("key")
//         console.log(value);
//     } catch {
//         console.error(error.message) 
//     }
// })()

const router = require("express").Router()
router.use("/user", UserAuthRoutes)
router.use("/", HomeRoutes)

module.exports = {
    AllRoutes : router
}