import TaskPage from "./pages/TaskPage";
import SignUpPage from "./pages/SignUpPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        {/* Route for Home */}
        <Route path="/" element={<TaskPage />} />

        {/* Route for Sign in / up */}
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
