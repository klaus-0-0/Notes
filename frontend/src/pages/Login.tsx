import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import image from "../assets/wall6.jpg";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const activeUser = localStorage.getItem("user-info");
    if (activeUser) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const userData = await axios.post(`${config.apiUrl}/Login`, {
        email,
        password,
      });

      if (userData) {
        localStorage.setItem("user-info", JSON.stringify(userData.data));
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-xl p-8 flex flex-col transition-transform duration-200 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h2>

       
        {/* <label className="text-sm text-gray-700 mb-1">Email</label> */}
        <input
          className="w-full bg-transparent border-b border-gray-500 py-2 mb-6 outline-none placeholder-gray-600"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

       
        {/* <label className="text-sm text-gray-700 mb-1">Password</label> */}
        <input
          className="w-full bg-transparent border-b border-gray-500 py-2 mb-8 outline-none placeholder-gray-600"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-lg shadow-md transition-transform duration-200 hover:scale-105 mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-lg shadow-md transition-transform duration-200 hover:scale-105 mt-4"
          onClick={()=> navigate("/Signup")}
        >
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Login;
