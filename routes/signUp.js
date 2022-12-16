const express = require("express");
const cors = require("cors");
const router = new express.Router();
const validator = require("validator");
const UserDetails = require("../models/user");

const app = express();

app.use(router);

router.post("/signUp", cors(), async (req, res) => {
  try {
    if (
      req.body.userName &&
      validator.isStrongPassword(req.body.password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      })
    ) {
      const userName = req.body.userName;
      const password = req.body.password;
      const check = await UserDetails.exists({ userName });
      if (check) {
        throw new Error("User already exists!");
      } else {
        const users = new UserDetails({
          userName,
          password,
        });
          await users.save();
          res.status(200).send({
            code: 200,
            status: "Success",
            message: "User Sign-up Done!",
            id: users._id,
          });
      }
    } else throw new Error("Enter all the required fields properly!");
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      code: 400,
      status: "Failed",
      message: error.message,
    });
  }
});

module.exports = router;
