import { User } from "../models/user.model";
import { Request, Response } from "express";
const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
    });

    res.status(201).json({
      message: "User registered successfully",
      id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ message: "Server error" });
  }
};

export { registerUser };
