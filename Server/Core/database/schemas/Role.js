const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    grade : {
        type : Number,
        required : true
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    default : {
        type : Boolean,
        default : false
    }
})

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema)

module.exports = Role