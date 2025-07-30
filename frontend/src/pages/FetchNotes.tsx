import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";

function FetchNotes() {
    const [notes, setNotes] = useState<any[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            const userData = JSON.parse(localStorage.getItem("user-info") || "{}");
            const userId = userData.user?.id;

            if (!userId) return;

            try {
                const notesData = await axios.post(`${config.apiUrl}/FetchNotes`, {
                    userId
                });

                if (notesData?.data?.notes) {
                    setNotes(notesData.data.notes);
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    console.log(notes)

    // interface Note {
    //     id: string;
    //     content: string;
    //     createdAt: string;
    //     userId: string;
    // }

    return (
        <div>
            <div>
                {notes.map((note, index) => (
                    <div key={note.id}>
                        <p>Note #{index + 1}</p>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>

            {/* <div>
                {notes.map((note: Note) => {
                    return (
                        <div key={note.id}>
                            <p>{note.content}</p>
                        </div>
                    )
                })}
            </div> */}

        </div>
    );
}

export default FetchNotes;