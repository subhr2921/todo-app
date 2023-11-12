const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env["JWT_SECRET_KEY"];
const commonResponse = require("../helpers/commonResponse");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"] || undefined;

    if (!authHeader || authHeader === "") {
      return commonResponse(res, 400, [], "Token Not Found");
    }

    let token = authHeader.split(" ")[1];
    if (token === null || token === "") {
      return commonResponse(res, 400, [], "Unauthorized Access");
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send("Unauthorized");
      }
      req.user = user;
      return next();
    });
  } catch (error) {
    console.log("error in verify token", error.message);
    return commonResponse(res, 500, [], error?.message);
  }
};

module.exports = verifyToken;
