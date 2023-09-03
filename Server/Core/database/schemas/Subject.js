const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

module.exports = Subject;
