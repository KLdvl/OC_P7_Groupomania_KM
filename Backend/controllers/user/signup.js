// External requires
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Model used
const User = require("../../models/User");

// Method for signing up with password hashing with bcrypt
exports.signUp = async (req, res) => {
  try {

    const {email, password} = req.body;
    let role = "User";
    User.count((err, count) => {
        if(!err && count === 0) {
            return role = "Admin"
        }
    })

    await bcrypt
      .hash(password, 10)
      .then(async (hash) => {
        await User.create({
          email: email,
          password: hash,
            role: role
        });
        await User.findOne( {email: email})
            .then((user) => {
                res.status(201).json({
                    userId: user._id,
                    token: jwt.sign({userId: user._id}, process.env.JWT_TOKEN, {
                        expiresIn: "24h",
                    }),
                });
          })
      })
  } catch (err) {
    res.status(500).json({error: err})
  }
}


