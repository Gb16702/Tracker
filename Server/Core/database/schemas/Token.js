const mongoose = require("mongoose")

const tokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true
    },
    expiration : {
        type : Date,
        required : true
    }
})

module.exports = mongoose.models.Token || mongoose.model("Token", tokenSchema)