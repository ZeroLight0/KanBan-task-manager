import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

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

  return (
    <>
      <nav className="w-full flex justify-between px-8 py-6  border-b-2 border-gray-400 items-center sticky">
        <p className="text-2xl text-[#4F5D71] cursor-default">KanBan</p>
        <div
          className="user rounded-full w-10 h-10 bg-[#b7c6d6] text-center text-2xl flex items-center justify-center text-[#4F5D71] cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          M
        </div>

        <div
          ref={menuRef}
          className=""
          style={{
            display: isOpen ? "block" : "none",
            position: "absolute",
            right: "10px",
            top: "60px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <p className="cursor-pointer p-2 ">dummytext@gmail.com</p>
          <p className="text-red-700 cursor-pointer hover:bg-gray-400 w-full p-2 rounded-b-md active:bg-gray-300">
            Log out
          </p>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
