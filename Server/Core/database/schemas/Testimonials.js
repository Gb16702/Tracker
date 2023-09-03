const mongoose = require("mongoose");

const TestimonialsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 40,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    appearAsAnonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Testimonials =
  mongoose.model.Testimonials ||
  mongoose.model("Testimonials", TestimonialsSchema);

module.exports = Testimonials;
