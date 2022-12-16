const express = require("express");
const router = new express.Router();
const UserDetails = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv")
env.config()

const app = express();
app.use(router);

const generateAuthToken = (id, userName) => {
  const token = jwt.sign({ id, userName }, process.env.SECRET_KEY, {
    expiresIn: "6h",
  });
  return token;
};

router.post("/login", async (req, res) => {
  try {
    if (req.body.userName && req.body.password) {
      const userName = req.body.userName;
      const password = req.body.password;
      const userCheck = await UserDetails.exists({ userName })
      if (userCheck) {
        const user = await UserDetails.findOne({ userName })
        const pwdCheck = await bcrypt.compare(password, user.password)
        if (pwdCheck) {
          const token = generateAuthToken(user._id, user.userName);
          res.status(200).send({
            code: 200,
            status: "success",
            message: `${user.userName} Login Successful!`,
            token,
            id: user._id,
            userName: user.userName,
          });
        } else throw new Error("Password is incorrect")
      } else throw new Error("User name doesn't exists!")
    } else throw new Error("Enter proper details!");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;