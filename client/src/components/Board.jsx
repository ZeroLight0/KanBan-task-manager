import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import TaskForm from "./TaskForm";

export default function Board({ isTaskOpen, setIsTaskOpen }) {
  const [columns, setColumns] = useState({
    todo: [],
    "in-progress": [],
    done: [],
  });

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

      const res = await fetch(`${apiBaseUrl}/api/v1/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (!result.status) return;

      const grouped = { todo: [], "in-progress": [], done: [] };
      result.data.forEach((t) => grouped[t.status || "todo"].push(t));
      setColumns(grouped);
    };

    fetchTasks();
  }, []);

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const sourceCol = Object.keys(columns).find((key) =>
      columns[key].some((t) => t._id === active.id)
    );

    const destCol =
      Object.keys(columns).find((key) =>
        columns[key].some((t) => t._id === over.id)
      ) || over.id;

    // same column reorder
    if (sourceCol === destCol) {
      const oldIndex = columns[sourceCol].findIndex((t) => t._id === active.id);
      const newIndex = columns[sourceCol].findIndex((t) => t._id === over.id);

      setColumns((prev) => ({
        ...prev,
        [sourceCol]: arrayMove(prev[sourceCol], oldIndex, newIndex),
      }));
      return;
    }

    // move between columns
    const task = columns[sourceCol].find((t) => t._id === active.id);

    setColumns((prev) => ({
      ...prev,
      [sourceCol]: prev[sourceCol].filter((t) => t._id !== active.id),
      [destCol]: [...prev[destCol], task],
    }));

    // backend update
    const token = localStorage.getItem("token");
    const apiBaseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    await fetch(`${apiBaseUrl}/api/v1/tasks/${active.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: destCol }),
    });
  };

  const addTask = (task) => {
    setColumns((prev) => ({
      ...prev,
      [task.status || "todo"]: [...prev[task.status || "todo"], task],
    }));
    setIsTaskOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    setColumns((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((key) => {
        updated[key] = updated[key].filter((t) => t._id !== taskId);
      });
      return updated;
    });
  };

  const handleEditTask = (task) => {
    setIsTaskOpen({ open: true, column: task.status, editingTask: task });
  };

  const labels = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done",
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex justify-between w-full gap-6">
          {Object.keys(columns).map((key) => (
            <TaskColumn
              key={key}
              id={key}
              title={labels[key]}
              tasks={columns[key]}
              onAddTask={(col) => setIsTaskOpen({ open: true, column: col })}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </DndContext>

      <TaskForm
        isTaskOpen={isTaskOpen}
        setIsTaskOpen={setIsTaskOpen}
        addTask={addTask}
      />
    </>
  );
}
