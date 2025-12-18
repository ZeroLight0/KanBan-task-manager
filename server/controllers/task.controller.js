import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = await Task.create({
      title,
      description,
      priority,
      dueDate,
      status: status || "todo",
      user: req.user.userId, // comes from authMiddleware
    });

    res.status(201).json({
      status: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ status: true, data: tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, user: req.user.userId },
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ status: true, data: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};
