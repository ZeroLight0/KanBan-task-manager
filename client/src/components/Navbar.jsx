import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    setTimeout(() => navigate("/"), 300);
  };

  return (
    <>
      <nav className="w-full flex justify-between px-8 py-6  border-b-2 border-gray-400 items-center sticky">
        <p className="text-2xl text-[#4F5D71] cursor-default">KanBan</p>
        <div
          className="user rounded-full w-10 h-10 bg-[#b7c6d6] text-center text-2xl flex items-center justify-center text-[#4F5D71] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
        </div>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute right-8 top-16 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200"
          >
            <p className="p-3 text-gray-700 border-b text-sm">
              {user?.email || "No email found"}
            </p>
            <button
              onClick={handleLogout}
              className="text-red-700 hover:bg-gray-100 w-full text-left p-3 text-sm font-medium"
            >
              Log out
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
