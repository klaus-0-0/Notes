import { Navigate, useLocation, useNavigate } from "react-router-dom";
import image from "../assets/wall9.jpg"

function NoteDetails() {
    const location = useLocation();
    const note = location.state?.note;
    const Navigate = useNavigate();

    if (!note) return <p className="text-center mt-10">Note not found</p>;

    function Signout () {
        localStorage.removeItem("user-info");
        Navigate("/Dashboard")
    }

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-8"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div>
                <button
                    className="absolute top-1 right-4 bg-rose-900 hover:bg-rose-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                    onClick={Signout}
                >
                    Dashboard
                </button>
            </div>
            <div className="bg-white bg-opacity-90 p-8 md:p-10 rounded-xl shadow-xl w-full max-w-2xl border border-gray-300">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 underline decoration-blue-400">
                    Note Details
                </h1>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg font-serif tracking-wide">
                    {note.content}
                </p>
            </div>
        </div>
    );
}

export default NoteDetails;
