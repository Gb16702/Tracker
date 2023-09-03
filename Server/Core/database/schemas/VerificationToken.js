const mongoose = require("mongoose")

const VerificationTokenSchema = new mongoose.Schema({
    User : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    token : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ["email", "password"],
        required : true
    }
})

module.exports = mongoose.models.EmailTokenSchema || mongoose.model("VerificationToken", VerificationTokenSchema)