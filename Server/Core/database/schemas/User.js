const mongoose = require('mongoose');

const minPasswordLength = 6;
const maxPasswordLength = 48;

const userSchema  = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    slug : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match : /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password : {
        type: String,
        required: true,
    },
    roles : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required : true
    },
    avatar : {
        type: String,
        required : false,
    }
}, { timestamps: true })

userSchema.index({email : 1})

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;