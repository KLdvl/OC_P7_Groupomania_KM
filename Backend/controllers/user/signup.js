// External requires
const bcrypt = require("bcrypt");

// Model used
const User = require("../../models/User");

// Method for signing up with password hashing with bcrypt
exports.signUp = async (req, res) => {
  try {
    const {email, password} = req.body;

    bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await User.create({
          email: email,
          password: hash,
        });
        res.status(201).json({message: "Utilisateur créé"})
      })
  } catch (err) {
    res.status(500).json({error: err})
  }
}


