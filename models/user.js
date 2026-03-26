const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Le nom d’utilisateur est requis"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "L’email est requis"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
    },
  },
  {
    timestamps: true,
  },
);

// Hachage du mot de passe avant la sauvegarde
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
