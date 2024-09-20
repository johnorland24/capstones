// services/notesService.ts  

import Env from "@/lib/env";

const API_URL =  Env.API_URL+'/api/notes';  

export const getNotes = async () => {  
    const response = await fetch(API_URL);  
    return response.json();  
};  
// services/notesService.ts  
export const deleteNote = async (id: string) => {  
    await fetch(`/api/notes/${id}`, {  
        method: 'DELETE',  
    });  
};
export const createNote = async (note: { title: string; content: string }) => {  
    const response = await fetch(API_URL, {  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json',  
        },  
        body: JSON.stringify(note),  
    });  
    return response.json();  
};  

// You can add more functions for update and delete...