import { Router } from "express";
import {
  createTask,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const taskRouter = Router();

// Get all tasks for the logged-in user
taskRouter.get("/", authMiddleware, getUserTasks);

// Create a new task
taskRouter.post("/create", authMiddleware, createTask);

taskRouter.patch("/:id", authMiddleware, updateTaskStatus);

export default taskRouter;
