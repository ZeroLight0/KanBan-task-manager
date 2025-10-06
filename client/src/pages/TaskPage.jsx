import { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Column from "../components/Column";

function TaskPage() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-start px-12 py-6">
        <Header />
      </div>
      <div className="flex justify-between items-start px-14 py-6">
        <Column setIsTaskOpen={setIsTaskOpen} isTaskOpen={isTaskOpen} />
      </div>
    </>
  );
}

export default TaskPage;
