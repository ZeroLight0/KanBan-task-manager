import { useState } from "react";

function SignUpAndIn() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateSignUp = () => {
    const { username, email, password } = formData;
    if (!email || !password || !username) {
      alert("Please complete all details");
      return false;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validateSignIn = () => {
    const { email, password } = formData;
    if (!email || !password) {
      alert("Please complete all details");
      return false;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateSignUp()) return;
    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      console.log(
        "🟡 Sending request to:",
        `${apiBaseUrl}/api/v1/auth/sign-up`
      );
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("🟡 Backend response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        alert("✅ Account created successfully!");
        window.location.href = "/home";
      }
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.log("Error during sign up:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
      console.log(
        "🟡 Sending request to:",
        `${apiBaseUrl}/api/v1/auth/sign-in`
      );
      const response = await fetch(`${apiBaseUrl}/api/v1/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("🟡 Backend response:", result);

      if (!response.ok) {
        throw new Error(
          result.message || `HTTP error! status: ${response.status}`
        );
      }
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.data.user));
        alert("✅ Signed in successfully!");
        window.location.href = "/home";
      }
      setFormData({ username: "", email: "", password: "" });
    } catch (error) {
      console.log("Error during sign in:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                id="email-in"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                type="password"
                id="password-in"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="bg-[#447CEE] text-white px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full mt-4 cursor-pointer text-sm sm:text-base font-semibold hover:bg-[#3a6bd6] transition-colors"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
          <form action="" style={{ display: isSignUp ? "block" : "none" }}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="font-semibold text-sm sm:text-base"
              >
                Username
              </label>
              <input
                type="text"
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
                id="username-up"
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
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email-up"
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
                required
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password-up"
                className="w-full p-2 sm:p-3 border border-gray-300 rounded-xl sm:rounded-2xl mt-2 bg-[#EEF0F5] text-[#3b4452] text-sm sm:text-base"
                placeholder="Enter your password"
              />
            </div>
            <button
              className="bg-[#447CEE] text-white px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl w-full mt-4 cursor-pointer text-sm sm:text-base font-semibold hover:bg-[#3a6bd6] transition-colors"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpAndIn;
