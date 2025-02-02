const { AdminRoutes } = require("./admin/admin.routes")
const { HomeRoutes } = require("./api/index")
const { UserAuthRoutes } = require("./user/auth")
const { DeveloperRoutes } = require("./user/developer.routes")

const router = require("express").Router()
router.use("/user", UserAuthRoutes)
router.use("/admin", AdminRoutes)
router.use("/developer", DeveloperRoutes)
router.use("/", HomeRoutes)

module.exports = {
    AllRoutes : router
}