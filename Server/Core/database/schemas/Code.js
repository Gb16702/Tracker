const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    value : {
        type: String,
        required: true
    },
    expiration : {
        type: Date,
        required: true
    },
    isUsed : {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Code = mongoose.models.Code || mongoose.model("Code", codeSchema)

module.exports = Code;
