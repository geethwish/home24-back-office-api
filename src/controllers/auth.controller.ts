import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

export const login = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { email, password } = req.body;

  console.log(req.body);

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    console.log(user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    // Sign the JWT token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "1h" }
    );

    // Respond with the token
    res.status(200).json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const signup = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  const { name, email, password } = req.body;

  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10; // Define the number of salt rounds explicitly
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(hashedPassword);

    const newUser = new User({
      name,
      email,
      passwordHash: hashedPassword,
    });

    console.log(newUser);

    await newUser.save();

    const payload = {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({ token });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
