import { VscAdd } from "react-icons/vsc";

function Header() {
  return (
    <header className="w-full">
      <div className="flex justify-between items-center py-6 px-2 sm:px-4 lg:px-6">
        <div className="group relative">
          <h1 className="text-4xl font-bold text-[#2f363f] cursor-default transition-all duration-300 group-hover:text-[#3a4756]">
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] bg-clip-text text-transparent">
                MY
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </span>{" "}
            KanBan Board
          </h1>
          <p className="text-[#4F5D71] mt-2 pl-2 relative before:absolute before:left-0 before:top-1 before:w-1 before:h-5 before:bg-gradient-to-b before:from-[#4f46e5] before:to-[#06b6d4] before:rounded-full">
            Manage your tasks efficiently with drag and drop functionality
          </p>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-[#4f46e520] to-transparent mx-8"></div>
    </header>
  );
}

export default Header;
