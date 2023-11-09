const mongoose = require("mongoose");
const ColorSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  colorName: {
    type: String,
    require: true,
  },
});
const Color = mongoose.model("colors", ColorSchema);
module.exports = Color;
