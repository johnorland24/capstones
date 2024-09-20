<?php

namespace App\Http\Controllers;  

use App\Models\Note;  
use Illuminate\Http\Request;  

class NoteController extends Controller  
{  
    public function index()  
    {  
        return Note::all();  
    }  

    public function store(Request $request)  
    {  
        $request->validate([  
            'title' => 'required',  
            'content' => 'required',  
        ]);  

        return Note::create($request->all());  
    }  

    public function show($id)  
    {  
        return Note::findOrFail($id);  
    }  

    public function update(Request $request, $id)  
    {  
        $note = Note::findOrFail($id);  
        $note->update($request->all());  
        return $note;  
    }  

    public function destroy($id)  
    {  
        Note::destroy($id);  
        return response()->noContent();  
    }  
}