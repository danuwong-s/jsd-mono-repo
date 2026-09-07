import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String },
    email: { 
        type: String, 
        unique: true, 
        lowercase: true, 
        trim: true,
         match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"], 
    },
    password: { type: String, select: false },
  },
  { timestamp: true },
);
export const User = mongoose.model("User", userSchema);
