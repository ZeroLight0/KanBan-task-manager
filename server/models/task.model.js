import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title required"],
      minLength: 3,
      maxLength: 20,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value >= new Date().setHours(0, 0, 0, 0),
        message: "Due date cannot be in the past",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
