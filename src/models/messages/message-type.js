const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    iduser_send: { type: Number, required: true },
    iduser_receive: { type: Number, required: true },
    message: { type: String, required: true },
    photo_receive: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", MessageSchema);
