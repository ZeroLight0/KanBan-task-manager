import React, { useState, useEffect } from "react";

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a task.");
      return;
    }

    // 👇 Inject correct column info (status)
    const newTask = {
      ...formData,
      status: isTaskOpen.column,
    };

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      const response = await fetch(`${apiBaseUrl}/api/v1/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Error creating task");

      addTask(result.data); // ✅ Add to UI
      setFormData({ title: "", description: "", priority: "low", dueDate: "" });
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <div
        className="w-full flex justify-center items-center min-h-screen bg-[#0000004f] absolute top-0 left-0 overflow-hidden"
        style={{ display: isTaskOpen?.open ? "flex" : "none" }}
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-md mx-auto p-6 bg-[#eef0f5] rounded-lg shadow-md"
        >
          <p className="text-xl font-semibold mb-5">Create New Task</p>
          <div className="form-group">
            <label htmlFor="title" className=" text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4"
              placeholder="Enter task title..."
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="description" className="text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4 resize-none"
              placeholder="Enter task description..."
              rows="4"
            ></textarea>
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 px-4"
                placeholder="Pick a due date"
              />
            </div>
          </div>
          <div className="submitAndCancel flex justify-end items-center mt-6">
            <button
              type="button"
              className="mt-4 w-[20%] bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 text-sm border-2 border-gray-400"
              onClick={() => setIsTaskOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-4 w-[26%] bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm ml-4  "
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TaskForm;
