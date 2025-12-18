import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Board from "../components/Board";

function TaskPage() {
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="flex justify-between items-start px-12 py-6">
        <Header />
      </div>
      <div className="flex justify-between items-start px-14 py-6">
        <Board setIsTaskOpen={setIsTaskOpen} isTaskOpen={isTaskOpen} />
      </div>
    </>
  );
}

export default TaskPage;
