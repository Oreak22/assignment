const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.status(401).json({ message: "no token attached with this request" });
    } else {
      const token = bearerToken.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "no token attached with the request" });
      } else {
        const decoded = await jwt.verify(token, process.env.jwt_secret);

        if (!decoded) {
          res.status(401).json({ message: "session expired" });
        } else {
          req.user = decoded.payload;
          next();
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "session expired" });
  }
};

module.exports = tokenVerify;
