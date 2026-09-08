import { Router } from "express";
import { supabase } from "../../config/supabase.js";

export const router = Router();

// Read users
router.get("/pg", async (req, res, next) => {
  try {
    const { data, error } = await supabase.from("users").select();
    return res.status(200).json({success: true, data});
  } catch (err) {
    next(err);
  }
});

// Create user
router.post("/pg", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
});

//Update user 
router.put("/pg/:id", async (req, res, next) => {
  try {

    
  } catch (err) {
    next(err);
  }
});

//Delete user
router.delete("/pg/:id", async (req, res, next) => {
  try {
  
  } catch (err) {
    next(err);
  }
});
