const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    firstName: { required: true, type: String, trim: true, minlength: 2 },
    lastName: { required: true, type: String, minlength: 2 },
    age: { required: true, type: Number },
    email: { required: true, type: String, unique: true, lowercase: true },
    phone: { required: true, type: String },
    password: { required: true, type: String },
    gender: { type: String, enum: ["female", "male"], required: true },
    verificationStatus: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
  } catch (err) {
    console.log(err);
  }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
