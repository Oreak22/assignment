const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const userRouter = require("./routes/user.route");

const port = process.env.port;
const DBURI = process.env.mongoDB_URI;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

mongoose
  .connect(DBURI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log({ message: "problem ti wa o", err });
  });

app.listen(port, () => {
  console.log(`working fine on port ${port}`);
});
