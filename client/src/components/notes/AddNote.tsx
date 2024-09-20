// components/AddNote.tsx  
"use client"
import { createNote } from '@/services/notesService';
import { useState } from 'react';  


const AddNote = () => {  
    const [title, setTitle] = useState('');  
    const [content, setContent] = useState('');  

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();  
        await createNote({ title, content });  
        setTitle('');  
        setContent('');  
        // Optionally, trigger a refresh of notes here.  
    };  

    return (  
        <form onSubmit={handleSubmit} className="mb-4">  
            <input  
                type="text"  
                value={title}  
                onChange={e => setTitle(e.target.value)}  
                placeholder="Note Title"  
                className="border rounded w-full p-2 mb-2 text-gray-900"  
                required  
            />  
            <textarea  
                value={content}  
                onChange={e => setContent(e.target.value)}  
                placeholder="Note Content"  
                className="border rounded w-full p-2 mb-2 text-gray-900"  
                required  
            />  
            <button type="submit" className="bg-blue-500 text-white rounded p-2">  
                Add Note  
            </button>  
        </form>  
    );  
};  

export default AddNote;