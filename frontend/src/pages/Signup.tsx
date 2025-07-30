import config from "../config";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import image from "../assets/wall7.jpg"

const Signup = () => {
    const [username, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
        navigate("/Dashboard");
    }

    const handleSignup = async () => {
        try {
            const userData = await axios.post(`${config.apiUrl}/Signup`, {
                username,
                email,
                password
            });
            localStorage.setItem("user-info", JSON.stringify(userData.data));
            console.log("success signup");
            navigate("/Dashboard")
        } catch (error) {
            console.error("signup failed", error);
        }
    }
// shadow-lg shadow-red-400
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${image})` }}
        >

            <div className=" bg-white bg-opacity-10  rounded-lg w-[400px] min-h-[500px] relative z-10 flex flex-col item-center justify-center px-10 py-12 transition-transform duration-200 hover:scale-105">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center z-20">Create an Account</h2>

              
                {/* <label className="text-gray-600 text-sm z-20">Name</label> */}
                <input
                    type="text"
                    className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20"
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setName(e.target.value)}
                />

                
                {/* <label className="text-gray-600 text-sm z-20">E-mail</label> */}
                <input
                    type="email"
                    className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

            
                {/* <label className="text-gray-600 text-sm z-20">Password</label> */}
                <input
                    type="password"
                    className="w-full bg-transparent border-b border-gray-400 py-2 mb-4 outline-none z-20"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="w-full sm:w-auto mt-4 bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-6 rounded-lg text-lg shadow-lg transition-transform duration-200 hover:scale-105"
                    onClick={handleSignup}>SignUp
                </button>
                <button className="w-full sm:w-auto mt-4 bg-red-500 hover:bg-red-600 text-black font-bold py-2 px-6 rounded-lg text-lg shadow-lg transition-transform duration-200 hover:scale-105"
                    onClick={()=> navigate("/Login")}>Login
                </button>

            </ div>
        </div>

    );
};

export default Signup;