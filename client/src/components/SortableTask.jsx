import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEllipsisH, FaFlag } from "react-icons/fa";
import { CiClock2 } from "react-icons/ci";

export default function SortableTask({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task._id });

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-md mb-3 cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold">{task.title}</h3>
        <FaEllipsisH className="text-gray-500 z-100" />
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
