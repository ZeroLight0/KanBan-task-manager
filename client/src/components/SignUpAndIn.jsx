import { useState } from "react";

function SignUpAndIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <div className="form w-[38%] h-auto bg-white p-8 rounded-2xl shadow-lg">
        <div className="top mb-6">
          <h1 className="text-2xl text-[#4F5D71] font-bold">
            Welcome to KanBan Task Manager
          </h1>
          <p className="mb-4 text-[#748296] ">
            Sign in to your account or create an account if you are new
          </p>
          <div className="sign flex justify-between items-center p-1 bg-[#B7BECD] rounded-2xl font-bold">
            <button
              className=" text-[#35465F] px-4 py-2 rounded-2xl w-[49%] cursor-pointer bg-[#EEF0F5]"
              style={{ backgroundColor: isSignIn ? "#EEF0F5" : "transparent" }}
              onClick={() => {
                setIsSignIn(true);
                setIsSignUp(false);
              }}
            >
              Sign In
            </button>
            <button
              className="  text-[#35465F] px-4 py-2 rounded-2xl w-[49%] cursor-pointer"
              style={{
                backgroundColor: isSignUp ? "#EEF0F5" : "transparent",
              }}
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
          <form
            action=""
            style={{
              display: isSignIn ? "block" : "none",
            }}
          >
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452]"
                placeholder="Enter your password"
              />
            </div>
            <button className="bg-[#447CEE] text-white px-4 py-2 rounded-2xl w-full mt-4 cursor-pointer">
              Sign In
            </button>
          </form>
          <form
            action=""
            style={{
              display: isSignUp ? "block" : "none",
            }}
          >
            <div className="mb-4">
              <label htmlFor="username" className="font-semibold">
                Username (optional)
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 border border-gray-300 rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452]"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452]"
                placeholder="Enter your password"
              />
            </div>
            <button className="bg-[#447CEE] text-white px-4 py-2 rounded-2xl w-full mt-4 cursor-pointer">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpAndIn;
