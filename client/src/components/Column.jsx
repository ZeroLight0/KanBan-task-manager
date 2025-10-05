import { FaEllipsisH } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { FaFlag } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import TaskForm from "./TaskForm";

function Column({ setIsTaskOpen, isTaskOpen }) {
  const [column, setColumn] = useState([
    {
      title: "To Do",
      tasks: [
        {
          title: "Task 1",
          description: "Description for Task 1",
          priority: "low",
          dueDate: "June 25",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "medium",
          dueDate: "June 26",
        },
        {
          title: "Task 3",
          description: "Description for Task 3",
          priority: "high",
          dueDate: "June 27",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "low",
          dueDate: "June 28",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "medium",
          dueDate: "June 29",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "high",
          dueDate: "June 30",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "low",
          dueDate: "July 1",
        },
      ],
    },
    {
      title: "In Progress",
      tasks: [
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "medium",
          dueDate: "July 2",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "high",
          dueDate: "July 3",
        },
        {
          title: "Task 2",
          description: "Description for Task 2",
          priority: "low",
          dueDate: "July 4",
        },
      ],
    },
    { title: "Done", tasks: [] },
  ]);

  const [selectedColumnIndex, setSelectedColumnIndex] = useState(0);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };
  const getPriorityBackgroundColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100";
      case "medium":
        return "bg-yellow-100";
      case "low":
        return "bg-green-100";
      default:
        return "bg-gray-100";
    }
  };

  const addTask = (newTask) => {
    const updatedColumns = [...column];
    updatedColumns[selectedColumnIndex].tasks.push(newTask);
    setColumn(updatedColumns);
    setIsTaskOpen(false);
  };
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEllipsisClick = (colIndex, taskIndex, e) => {
    e.stopPropagation();
    setSelectedTask({ colIndex, taskIndex });
    setIsOpen(true);
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;
    const updatedColumns = [...column];
    updatedColumns[selectedTask.colIndex].tasks.splice(
      selectedTask.taskIndex,
      1
    );
    setColumn(updatedColumns);
    setSelectedTask(null);
  };

  const handleEditTask = () => {
    console.log("Edit task", selectedTask);
    setSelectedTask(null);
  };

  const editRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {column.map((col, colIndex) => (
        <div className="w-[25%] flex flex-col justify-between rounded-xl px-2">
          <div
            key={colIndex}
            className="title flex justify-between items-center py-2 mb-4"
          >
            <div className="flex items-center gap-2">
              <p className="font-bold">{col.title}</p>
              <div className="px-2 bg-gray-300 rounded-full ">
                {col.tasks.length}
              </div>
            </div>
          </div>
          <button
            className="w-full bg-transparent rounded-xl px-4 py-2 border-dashed border-2 border-gray-400 flex items-center justify-start cursor-pointer mb-4 hover:bg-blue-500 hover:text-white transition-colors duration-300 hover:border-blue-500 "
            onClick={() => {
              setSelectedColumnIndex(colIndex);
              setIsTaskOpen(true);
            }}
          >
            {" "}
            <VscAdd />
            &nbsp; Add a Task
          </button>
          {col.tasks.map((task, taskIndex) => (
            <div
              key={`task-${colIndex}-${taskIndex}`}
              className="task-list mt-2 relative"
            >
              <div
                key={taskIndex}
                className=" group task-item bg-white p-4 rounded-lg shadow-md mb-2 relative"
              >
                <FaEllipsisH
                  className="hidden group-hover:absolute group-hover:flex cursor-pointer top-4 right-4"
                  onClick={(e) => handleEllipsisClick(colIndex, taskIndex, e)}
                />
                {/* Modal */}
                {selectedTask?.colIndex === colIndex &&
                  selectedTask?.taskIndex === taskIndex && (
                    <div
                      className="bg-white p-4 rounded-lg shadow-lg absolute top-1 left-60 z-50 w-36"
                      ref={editRef}
                      style={{ display: isOpen ? "flex" : "none" }}
                    >
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={handleEditTask}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit Task
                        </button>
                        <button
                          onClick={handleDeleteTask}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete Task
                        </button>
                        <button
                          onClick={() => setSelectedTask(null)}
                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                <h3 className="font-semibold mb-4">{task.title}</h3>
                <p>{task.description}</p>
                <div className="w-full flex justify-between items-center mt-3">
                  <p
                    className={`rounded-2xl flex items-center gap-1 p-1.5 text-sm ${getPriorityColor(
                      task.priority
                    )} ${getPriorityBackgroundColor(task.priority)}`}
                  >
                    <FaFlag />
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </p>
                  <p className="rounded-2xl flex items-center gap-1 p-1.5 text-sm">
                    <CiClock2 />
                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <TaskForm
        isTaskOpen={isTaskOpen}
        setIsTaskOpen={setIsTaskOpen}
        addTask={addTask}
      />
    </>
  );
}

export default Column;
