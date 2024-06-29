import User from "../models/usermodel.js";

//  CREATE USER

export const create = async (req, res) => {
  try {
    const {  email } = req.body;

    // Check if user already exists with same fname, lname, and email

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists with same  email" });
    }

    const userData = new User(req.body);

    const savedData = await userData.save();

    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  GET USER

export const getall = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ mag: "user data not found !!!" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  GET ONE USER

export const getone = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "user not found" });
    }

    res.status(200).json(userExist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  UPDATE USER

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(401).json({ msg: "user not found" });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//   DELETE USER

export const deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
