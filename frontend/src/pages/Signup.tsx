import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import config from "../config";
import wall from "../assets/SignBI.png"

interface UserInfo {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const Signup: React.FC = () => {
  const [username, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const info = localStorage.getItem("token");
    if (info) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  const handleSignup = async () => {
    try {
      const userData = await axios.post<UserInfo>(`https://notes-1v6a.onrender.com/api/signup`, {
        username,
        email,
        password,
      });

      console.log("userdata = ",userData.data.token)
      localStorage.setItem("token", JSON.stringify(userData.data.token));
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1500);
    } catch (error: any) {
      console.error("Signup Failed:", error?.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <img
        src={wall}
        alt="Background"
        className="absolute w-full h-full object-cover opacity-100"
      />

      <nav className="w-full bg-white p-4 flex justify-end relative z-10">
        <div className="flex space-x-6">
          <button className="text-black font-bold mt-4" onClick={() => navigate("")}>
            About
          </button>
          <div className="flex justify-center pt-4 gap-4">
            <button
              className="w-50 bg-black hover:bg-cyan-700 text-white py-2 px-4 rounded font-medium transition"
              onClick={handleSignup}
            >
              Sign up
            </button>
            <button
              className="w-50 bg-white hover:bg-cyan-700 text-black border border-black py-2 px-4 rounded font-medium transition"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center lg:justify-start p-4 relative z-10">
        <div className="w-full max-w-md lg:ml-60 bg-white bg-opacity-90 p-6 rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2">Welcome</p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Username"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full border border-black rounded p-2 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center pt-4 gap-4">
              <button
                className="w-50 bg-black hover:bg-cyan-700 text-white py-2 px-4 rounded font-medium transition"
                onClick={handleSignup}
              >
                Sign up
              </button>
              <button
                className="w-50 bg-white hover:bg-cyan-700 text-black border border-black py-2 px-4 rounded font-medium transition"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
