import { Router } from "express";
import { supabase } from "../../config/supabase.js";

export const router = Router();

// Read users
router.get("/", async (req, res, next) => {
  try {
 
  } catch (err) {
    next(err);
  }
});

// Create user
router.post("/", async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
});

//Update user 
router.put("/:id", async (req, res, next) => {
  try {

    
  } catch (err) {
    next(err);
  }
});

//Delete user
router.delete("/:id", async (req, res, next) => {
  try {
  
  } catch (err) {
    next(err);
  }
});
