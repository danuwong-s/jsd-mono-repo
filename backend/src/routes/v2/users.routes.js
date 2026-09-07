import { Router } from "express";
import { User } from "../../models/user.model.js";

export const router = Router();

// Read users
router.get("/", async (req, res, next) => {
  try {
    //1.Get users data from database
    const response = await User.find();
    //2.Send response object back to client
    return res.json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

// Create user
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing you like crazy." });
    }

    const newUser = await User.create({ username, email, password });
    // Convert to JavaScript Object
    const { password: _password, ...userWithoutPassword } = newUser.toObject();

    return res.status(201).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
});

//Update user
router.put("/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

//Delete user
router.delete("/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});
