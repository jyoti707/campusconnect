const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      message:
        "Registration Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Password",
      });
    }

    const token =
      jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

    res.json({
      message:
        "Login Successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
      });
  }
};

const getUsers = async (
  req,
  res
) => {
  const users =
    await User.find();

  res.json(users);
};

const updateUser = async (
  req,
  res
) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message:
        error.message,
    });
  }
};

const deleteUser = async (
  req,
  res
) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "User Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
};