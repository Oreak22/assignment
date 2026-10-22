const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log(req.body);

  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      res
        .status(400)
        .json({ message: "go away from me for i do not know you" });
    }
    console.log(user);

    const verify = await bcrypt.compare(req.body.password, user.password);

    console.log(verify);

    if (verify) {
      const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const token = await jwt.sign({ payload }, process.env.jwt_secret, {
        expiresIn: "90s",
      });

      res.status(200).send({ message: "my guy its been a while", token });
    } else {
      res.status(401).send({ message: "you are a bad person, shuuuu" });
    }
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////////////////////////////////////

const dashboard = async (req, res) => {
  // console.log(req.headers.authorization.split(" "));
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) res.send({ message: "your message" });
    try {
      const decoded = jwt.verfy(token, process.env.jwt_secret);
      console.log(decoded);
    } catch (err) {
      console.log(err);
    }
  } else {
    res.send({ message: "Barawo, ole " });
  }
};
//////////////////////////////////////////////////////////////////////

const register = async (req, res) => {
  try {
    const newUser = new userModel(req.body);

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.redirect("/auth/alluser");
  } catch (err) {
    console.log(err);
  }
};
//////////////////////////////////////////////////////////////////////

const allUser = async (req, res) => {
  try {
    const allUser = await userModel.find();
    res.json(allUser);
  } catch (err) {
    console.log(err);
  }
};
//////////////////////////////////////////////////////////////////////

module.exports = { register, allUser, login, dashboard };
