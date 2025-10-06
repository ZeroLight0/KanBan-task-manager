import { useState } from "react";

function SignUpAndIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <div className="form w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-[38%] h-auto bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg mx-auto mt-8 sm:mt-10 md:mt-20 mb-8 sm:static">
        <div className="top mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl text-[#4F5D71] font-bold text-center sm:text-left">
            Welcome to KanBan Task Manager
          </h1>
          <p className="mb-4 text-[#748296] text-sm sm:text-base text-center sm:text-left">
            Sign in to your account or create an account if you are new
          </p>
          <div className="sign flex justify-between items-center p-1 bg-[#B7BECD] rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base">
            <button
              className="text-[#35465F] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl w-[49%] cursor-pointer transition-colors"
              style={{ backgroundColor: isSignIn ? "#EEF0F5" : "transparent" }}
              onClick={() => {
                setIsSignIn(true);
                setIsSignUp(false);
              }}
            >
              Sign In
            </button>
            <button
              className="text-[#35465F] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl w-[49%] cursor-pointer transition-colors"
              style={{ backgroundColor: isSignUp ? "#EEF0F5" : "transparent" }}
              onClick={() => {
                setIsSignIn(false);
                setIsSignUp(true);
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="bottom">
          <form action="" style={{ display: isSignIn ? "block" : "none" }}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="font-semibold text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-semibold text-sm sm:text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>
            <button className="bg-[#447CEE] text-white px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full mt-4 cursor-pointer text-sm sm:text-base font-semibold hover:bg-[#3a6bd6] transition-colors">
              Sign In
            </button>
          </form>
          <form action="" style={{ display: isSignUp ? "block" : "none" }}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="font-semibold text-sm sm:text-base"
              >
                Username (optional)
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="font-semibold text-sm sm:text-base"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="font-semibold text-sm sm:text-base"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>
            <button className="bg-[#447CEE] text-white px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full mt-4 cursor-pointer text-sm sm:text-base font-semibold hover:bg-[#3a6bd6] transition-colors">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpAndIn;
