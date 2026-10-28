const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerifcationEmail } = require("../services/verifcationmail.service");

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
  console.log(req.user);
  // console.log(req.headers.authorization.split(" "));
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) res.send({ message: "your message" });
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret);
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
    await sendVerifcationEmail({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    });

    res.send(savedUser);
  } catch (err) {
    console.log(err);
  }
};

// assignment: putting together the knowledge of jwt class and the nodemailer class, take a go at reset password flow and also verify email, make is a full stack project (use react/html with pretty ui for the front end and node/express for the backend), send a reset link to the users email on request of reset password, and also for verify email, when a user registers, send them a verification link to their email for verification. Make research on the flow of these two features and also try and do this assignment with minimum AI assistance (this is your learning process so learn!).
// Happy coding!!!, see you tomorrow for the next class.
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
