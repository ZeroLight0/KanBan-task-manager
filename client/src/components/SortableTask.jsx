import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEllipsisH, FaFlag } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";
import { useState } from "react";

export default function SortableTask({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });
  const [showMenu, setShowMenu] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400 bg-red-100";
      case "medium":
        return "text-yellow-500 bg-yellow-100";
      case "low":
        return "text-green-500 bg-green-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const apiBaseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${apiBaseUrl}/api/v1/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      onDelete(task._id);
      setShowMenu(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task");
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-lg shadow-md mb-3"
    >
      <div
        className="cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <div className="flex justify-between items-start relative">
          <h3 className="font-semibold select-none">{task.title}</h3>
          <div
            className="relative pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          >
            <button
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1 hover:bg-gray-200 rounded transition relative z-10"
            >
              <FaEllipsisH className="text-gray-500" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-300 rounded-lg shadow-lg py-2 z-20 min-w-[120px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-blue-50 text-blue-600 font-medium transition text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 font-medium transition text-sm border-t border-gray-200"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-2">{task.description}</p>

      <div className="flex justify-between items-center text-sm">
        <span
          className={`p-1 rounded-xl flex items-center gap-1 ${getPriorityColor(
            task.priority
          )}`}
        >
          <FaFlag /> {task.priority}
        </span>

        <span className="flex items-center gap-1 text-gray-500">
          <CiClock2 />
          {task.dueDate &&
            new Date(task.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
        </span>
      </div>
    </div>
  );
}
