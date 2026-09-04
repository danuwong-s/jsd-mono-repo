import { Router } from "express";
import { router as usersRoutes } from "./users.routes.";

export const router = Router();

router.use("/users", usersRoutes);