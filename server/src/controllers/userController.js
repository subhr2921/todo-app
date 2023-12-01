const bcrypt = require("bcrypt");
const commonResponse = require("../helpers/commonResponse");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
let _ENV = process.env;
const mongoose = require("mongoose");

// To Create an User
const createUser = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;
    let isExits = await User.findOne({ email });
    if (isExits) return commonResponse(res, 409, [], "User Already Exits.");
    const encryptedPassword = await bcrypt.hash(password, 10);
    let user = await User.create({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
    let token = jwt.sign({ _id: user._id }, _ENV["JWT_SECRET_KEY"], {
      expiresIn: "72H",
    });
    return commonResponse(res, 200, {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      token,
    });
  } catch (error) {
    console.log("error", error.message);
    return commonResponse(res, 500, [], error.message);
  }
};

//To Get User Data
const updateUser = async (req, res) => {
  try {
    const { name, mobile } = req.body;
    let userId = req.body?.userId || null;
    const user = await User.findById(userId);
    if (!user) return commonResponse(res, 400, [], "User Not Found");

    user.name = name;
    user.mobile = mobile;
    await user.save();
    return commonResponse(res, 200, [], "User Updated Successfully");
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

//To Get Single User Data
const getUser = async (req, res) => {
  try {
    let _id = new mongoose.Types.ObjectId(req.user._id);
    const userDetails = await User.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "user",
          as: "task",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          mobile: 1,
          "task._id": 1,
          "task.title": 1,
          "task.isDone": 1,
        },
      },
      {
        $match: { _id },
      },
    ]);
    return commonResponse(res, 200, userDetails);
  } catch (error) {
    return commonResponse(res, 500, [], error.message);
  }
};

module.exports = {
  getUser,
  createUser,
  updateUser,
};
