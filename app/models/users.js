const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema({
    first_name : {type: String},
    last_name : {type: String},
    username : {type: String, required : true, lowercase: true},
    phone : {type: String},
    email : {type: String, lowercase: true},
    password : {type: String},
    otp : {type: Object, default : {
        code : "",
        expires : 0
    }},
    bills : {type: [], default:[]},
    discount : {type: Number, default: 0},
    birthday : {type: String, default: 0},
    roles : {type: [String], default: ["USER"]},
})

module.exports = {
    UserModel: mongoose.model("user", Schema)
}