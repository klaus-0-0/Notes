import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import wall from "../assets/wall4.png"

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/fetchNotes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setNotes(res.data.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCreateNote = () => {
    navigate("/creatnotes");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <img
        src={wall}
        className="absolute w-full h-full object-cover z-0"
        alt="Chat background"
      />
      {/* Navbar */}
      <nav className="relative flex justify-between items-center bg-white shadow px-6 py-4">
        <h1 className="relative text-xl font-bold text-gray-800">📝 Your Notes</h1>
        <div className="space-x-4 relative">
          <button
            onClick={handleCreateNote}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
          >
            Create Note
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Notes Section */}
      <main className="relative p-6">
        {loading ? (
          <p className="text-gray-600">Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No notes yet generated.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer overflow-hidden hover:scale-105 transform transition-transform duration-300"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h2>
                <p className="text-gray-700 mt-2">{note.content}</p>
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;