import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import wall from "../assets/wall5.jpg"

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token")
      await axios.post(
        "http://localhost:3000/api/notes",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Note creation failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <img
        src={wall}
        className="absolute w-full h-full object-cover z-0"
        alt="Chat background"
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-transparent shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-200 text-center">Create Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
          required
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            type="submit"
            className="bg-gray-300 text-black px-10 py-2 rounded hover:bg-gray-500 transition duration-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 text-black px-10 py-2 rounded hover:bg-gray-500 transition duration-300"
          >
            back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;