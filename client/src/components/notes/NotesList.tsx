"use client";  
import { getNotes, deleteNote } from '@/services/notesService';  
import { useEffect, useState } from 'react';  

const NotesList = () => {  
    const [notes, setNotes] = useState<any[]>([]);  

    useEffect(() => {  
        const fetchNotes = async () => {  
            const data = await getNotes();  
            setNotes(data);  
        };  
        fetchNotes();  
    }, []);  

    const handleDelete = async (noteId: string) => {  
        // Call the delete function from the service  
        await deleteNote(noteId);  
        // Update the local state to remove the deleted note  
        setNotes(notes.filter(note => note.id !== noteId));  
    };  

    return (  
        <div>  
            <h1 className="text-2xl mb-4">Notes</h1>  
            <ul>  
                {notes.map(note => (  
                    <li key={note.id} className="border rounded p-2 mb-2">  
                        <h2 className="font-bold">{note.title}</h2>  
                        <p>{note.content}</p>  
                        <button  
                            className="bg-red-500 text-white py-1 px-2 rounded"  
                            onClick={() => handleDelete(note.id)}  
                        >  
                            Delete  
                        </button>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default NotesList;