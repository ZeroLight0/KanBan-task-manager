import { Router } from "express";
import {
  createTask,
  getUserTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const taskRouter = Router();

// Get all tasks for the logged-in user
taskRouter.get("/", authMiddleware, getUserTasks);

// Create a new task
taskRouter.post("/create", authMiddleware, createTask);

// Update task status only (drag and drop)
taskRouter.patch("/:id", authMiddleware, updateTaskStatus);

// Update task details (edit form)
taskRouter.put("/:id", authMiddleware, updateTask);

// Delete a task
taskRouter.delete("/:id", authMiddleware, deleteTask);

export default taskRouter;
