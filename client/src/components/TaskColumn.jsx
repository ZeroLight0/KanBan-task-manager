import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import SortableTask from "./SortableTask";
import { VscAdd } from "react-icons/vsc";

export default function TaskColumn({ id, title, tasks, onAddTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id, // 👈 column is now a droppable target
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-1/3 bg-gray-50 p-4 rounded-lg min-h-[300px] transition ${
        isOver ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold">{title}</h2>
        <span className="px-2 bg-gray-300 rounded-full">{tasks.length}</span>
      </div>

      <button
        onClick={() => onAddTask(id)}
        className="mt-3 w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-400 rounded-lg hover:bg-blue-500 hover:text-white transition mb-3"
      >
        <VscAdd /> Add Task
      </button>

      <SortableContext
        items={tasks.map((t) => t._id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableTask key={task._id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
}
