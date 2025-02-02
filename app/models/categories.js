const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema({
    title : {type: String, required : true},
    parent : {type: mongoose.Types.ObjectId, default : undefined},
})

module.exports = {
    CategoryModel: mongoose.model("category", Schema)
}

//web developer
    //front-end:
        //title : front-end
        //parent : web developerID
    //back-end:
//AI
//IOT