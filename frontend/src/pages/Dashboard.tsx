import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import image from "../assets/wall11.jpg";

function Dashboard() {
  const [username, setUsername] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [notes, setNotes] = useState<any[]>([]);
  const [noteIndex, setNoteIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userData = JSON.parse(localStorage.getItem("user-info") || "{}");
      const userId = userData?.user?.id;

      setUsername(userData?.user?.username || "...");
      setUserEmail(userData?.user?.email || "...");

      try {
        const response = await axios.post(`${config.apiUrl}/FetchNotes`, {
          userId: userId,
        });

        setNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    };

    fetchData();
  }, []);

  function Signout() {
    localStorage.removeItem("user-info");
    navigate("/Signup")
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-10 sm:px-6"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h1 className="mt-8 mb-6 font-bold text-gray-700 text-5xl text-center">Dashboard</h1>
      <div>
        <button
          className="absolute top-1 right-4 bg-orange-700 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
          onClick={Signout}
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg shadow-gray-500 text-center w-full max-w-md mb-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {username}!</h1>
        <h2 className="text-lg text-gray-600">{userEmail}</h2>
      </div>


      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg text-lg shadow-md transition-transform duration-200 hover:scale-105 mb-6"
        onClick={() => navigate("/Notes")}
      >
        Create Notes
      </button>


      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-4 text-center">Your Notes</h2>

        <div className="flex flex-col gap-4">
          {notes?.map((note, i) => (
            <div key={note.id || i}>
              <p className="bg-white p-4 rounded shadow text-gray-700 cursor-pointer"
                onClick={() => {
                  setNoteIndex(i);
                  navigate("/NoteDetails", { state: { note } });
                }}>
                {`note ${i + 1}`}</p>
            </div>
          )) || <p>No notes found.</p>}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
