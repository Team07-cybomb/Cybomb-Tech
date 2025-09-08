const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true }, // better as Date
    image: { type: String, default: "/images/blog/default.jpg" },
    description: { type: String, required: true },
    fullContent: { type: String, required: true },
    category: { type: String }, // optional
    tags: [{ type: String }]    // optional
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
