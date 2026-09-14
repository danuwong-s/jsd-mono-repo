import { Router } from "express";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authUser  } from "../../middlewares/authUser.js";

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
router.put("/:id", async (req, res, next) => {
  try {
    //เอา data เดิมจาก id
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json("error: username, email and password are required!");
    }
    //สร้าง username , email , password อันใหม่
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username,
        email: email,
        password: password,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");
    //response ค่าใหม่กลับ username , email , password
    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: " user , email and password are not completed" });
    }
    return res.status(200).json(updatedUser);
    
  } catch (err) {
    next(err);
  }
});

//Delete user
router.delete("/:id", async (req, res, next) => {
  try {
     const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    return res.json(deletedUser);
  } catch (err) {
    next(err);
  }
});

//Login user

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password){
      return res
      .status(400)
      .json({ success: false, message: "Email and Password are required!"});
    }
  
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
      .status(400)
      .json({ success: false, message: "User not found!" });
    }

    if (!isMatched) {
      return res
      .status(400)
      .json({ success: false, message: "Incorrect password!" });
    }

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: "1h",});

    const isprod = process.env.NODE.ENV === "production";

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    return res
    .status(200)
    .json({ 
      success: true,
      message: "Login successful!",
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
    });

  } catch (err) {
    next(err);
  }
});

// Check user token

router.get("/auth/me", async (req, res, next) => {

  try {
    req.user.user._id;
   const user = await User.findById(UserId);

   if (!user){
    return res
    .status(401)
    .json({success: false, message: "Not found"});
    return res
    .status(200)
    .json({success: true, data: {_id: user._id, username: user.username, email: user.email, role: user.role}});
   }
  } catch (err) {
    next(err);
  }
})