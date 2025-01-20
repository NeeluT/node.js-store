const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const createError = require("http-errors")
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const { AllRoutes } = require("./router/router")
const morgan = require("morgan")

module.exports = class application {
    #app = express()
    #DB_URI
    #PORT
    constructor(PORT, DB_URI) {
        this.#PORT = PORT
        this.#DB_URI = DB_URI
        this.configApplication()
        this.connectToMongoDB()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }
    configApplication() {
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition : {
                info : {
                    title : "Boto Start Store",
                    version : "2.0.0",
                    description : "The largest Training Store for programmers"
                },
                servers : [
                    {
                        url : "http://localhost:5000"
                    }
                ]
            },
            apis : ["./app/router/**/*.js"]
        })))
    }
    createServer() {
        const http = require("http")
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log("run > http://localhost:" + this.#PORT);
        })
    }
    connectToMongoDB() {
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("connected to DB");
        }).catch(err => {
            console.log(err?.message ?? "Failed DB connection");
        })
        mongoose.connection.on("connected", () => {
            console.log("mongoose connected to db");
        })
        mongoose.connection.on("disconnected", () => {
            console.log("mongoose connection failed");
        })
    }
    createRoutes() {
        this.#app.use(AllRoutes)
    }
    errorHandling() {
        this.#app.use((req, res, next) => {
           next(createError.NotFound("Route not found"))
        })
        this.#app.use((error, req, res, next) => {
            const serverError = createError.InternalServerError()
            const statusCode = error.status || serverError.status
            const message = error.message || serverError.message
            return res.status(statusCode).json({
                errors: {
                    statusCode,
                    message
                }
            })
        })
    }
}
