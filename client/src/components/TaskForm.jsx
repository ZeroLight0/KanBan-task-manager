import React, { useState, useEffect } from "react";
import ErrorNotification from "./ErrorNotification";
import InputError from "./InputError";
import { validateTaskForm } from "../utils/validation";

function TaskForm({ isTaskOpen, setIsTaskOpen, addTask }) {
  useEffect(() => {
    if (isTaskOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
    return () => document.body.classList.remove("body-no-scroll");
  }, [isTaskOpen]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Populate form when editing a task
  useEffect(() => {
    if (isTaskOpen?.editingTask) {
      setFormData({
        title: isTaskOpen.editingTask.title || "",
        description: isTaskOpen.editingTask.description || "",
        priority: isTaskOpen.editingTask.priority || "low",
        dueDate: isTaskOpen.editingTask.dueDate || "",
      });
      setIsEditing(true);
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
      });
      setIsEditing(false);
    }
    setFormErrors({});
    setNotification({ message: "", type: "" });
  }, [isTaskOpen?.editingTask]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    if (formErrors[id]) {
      setFormErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setNotification({ message: "", type: "" });

    const validation = validateTaskForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      setNotification({
        message: "Please check details",
        type: "error",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setNotification({
        message: "You must be logged in to add a task",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      if (isEditing) {
        // Update existing task
        const response = await fetch(
          `${apiBaseUrl}/api/v1/tasks/${isTaskOpen.editingTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = result.message || "Error updating task";
          setNotification({ message: errorMessage, type: "error" });
          return;
        }

        setNotification({
          message: "Task updated successfully!",
          type: "success",
        });

        setTimeout(() => {
          setFormData({
            title: "",
            description: "",
            priority: "low",
            dueDate: "",
          });
          setIsTaskOpen(false);
          // Refresh page to get updated task
          window.location.reload();
        }, 1200);
      } else {
        // Create new task
        const newTask = {
          ...formData,
          status: isTaskOpen.column,
        };

        const response = await fetch(`${apiBaseUrl}/api/v1/tasks/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMessage = result.message || "Error creating task";
          setNotification({ message: errorMessage, type: "error" });
          return;
        }

        addTask(result.data);
        setNotification({
          message: "Task created successfully!",
          type: "success",
        });

        setTimeout(() => {
          setFormData({
            title: "",
            description: "",
            priority: "low",
            dueDate: "",
          });
          setIsTaskOpen(false);
        }, 1200);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        message: error.message || "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ErrorNotification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <div
        className="w-full flex justify-center items-center min-h-screen bg-[#0000004f] fixed top-0 left-0 overflow-hidden"
        style={{ display: isTaskOpen?.open ? "flex" : "none" }}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-md mx-auto p-6 bg-[#eef0f5] rounded-lg shadow-md max-w-md"
        >
          <p className="text-xl font-semibold mb-5">
            {isEditing ? "Edit Task" : "Create New Task"}
          </p>
          <div className="form-group">
            <label htmlFor="title" className="text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className={`mt-1 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4 ${
                formErrors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter task title..."
              required
              disabled={isLoading}
            />
            <InputError message={formErrors.title} />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className={`mt-1 w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4 resize-none ${
                formErrors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter task description..."
              rows="4"
              disabled={isLoading}
            ></textarea>
            <InputError message={formErrors.description} />
          </div>
          <div className="form-group mt-4 flex justify-between items-center">
            <div className="form-group w-1/2 mr-2 ">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4"
                disabled={isLoading}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group w-1/2 ml-2 ">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={`mt-1 block w-full border rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4 ${
                  formErrors.dueDate ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Pick a due date"
                disabled={isLoading}
              />
              <InputError message={formErrors.dueDate} />
            </div>
          </div>
          <div className="submitAndCancel flex justify-end items-center mt-6">
            <button
              type="button"
              className="mt-4 w-[20%] bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-sm border-2 border-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
              onClick={() => setIsTaskOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`mt-4 w-[26%] bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm ml-4 disabled:opacity-70 disabled:cursor-not-allowed ${
                isLoading ? "opacity-70" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Task"
                : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
