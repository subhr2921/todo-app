const bcrypt = require("bcrypt");
const commonResponse = require("../helpers/commonResponse");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
let _ENV = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email }).select("+password");
    if (!userData)
      return commonResponse(res, 400, [], "Invalid Email or Password");

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch)
      return commonResponse(res, 400, [], "Invalid Email or Password");
    let token = jwt.sign({ _id: userData._id }, _ENV["JWT_SECRET_KEY"], {
      expiresIn: "72H",
    });
    return commonResponse(res, 200, {
      _id: userData._id,
      name: userData.name,
      email: userData.email,
      mobile: userData.mobile,
      token,
    });
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

module.exports = {
  login,
};
