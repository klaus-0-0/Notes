import config from "../config";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/wall8.jpg";

function Notes() {
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

    const NoteHandler = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user-info") || "null");
    const userId = userInfo?.user?.id;

    if (!userId) {
      console.error("User not found");
      return;
    }

    try {
      const response = await axios.post(`${config.apiUrl}/Notes`, {
        content,
        userId,
      });
      console.log("Note saved", response.data);
      setContent("");
    } catch (error) {
      console.error("Error saving note", error);
    }
  };

  const Dashboard = () => {
    navigate("/Dashboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white bg-opacity-40 backdrop-blur-md p-6 rounded-lg shadow-xl w-full max-w-lg flex flex-col items-center transition-transform duration-200 hover:scale-105">
        <textarea
          placeholder="Start typing here..."
          className="bg-white bg-opacity-70 w-full h-64 p-4 text-left align-top resize-none rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-cyan-400 mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="w-full sm:w-auto mt-2 bg-cyan-600 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded-lg text-lg shadow-lg transition-transform duration-200 hover:scale-105"
          onClick={NoteHandler}
        >
          Save
        </button>
        <button
          className="w-full sm:w-auto mt-4 bg-cyan-600 hover:bg-cyan-400 text-black font-bold py-2 px-6 rounded-lg text-lg shadow-lg transition-transform duration-200 hover:scale-105"
          onClick={Dashboard}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

export default Notes;
