const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    password:String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Register", RegisterSchema);
