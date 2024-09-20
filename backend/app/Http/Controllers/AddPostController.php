<?php  

namespace App\Http\Controllers;  

use App\Models\AddPost;  
use Illuminate\Http\Request;  
use Illuminate\Support\Facades\Storage;  

class AddPostController extends Controller  
{  
    public function index()  
    {  
        $posts = AddPost::with('user')->get();  
        return response()->json($posts);  
    }  

    public function store(Request $request)  
    {  
        $request->validate([  
            'user_id' => 'required|exists:users,id',  
            'title' => 'required|string|max:255',  
            'content' => 'required|string',  
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate images  
        ]);  

        $imagePaths = [];  
        if ($request->hasFile('images')) {  
            foreach ($request->file('images') as $image) {  
                $imagePaths[] = $image->store('images', 'public');  
            }  
        }  

        $post = AddPost::create([  
            'user_id' => $request->user_id,  
            'title' => $request->title,  
            'content' => $request->content,  
            'images' => json_encode($imagePaths),  
        ]);  

        return response()->json($post, 201);  
    }  

    public function show($id)  
    {  
        $post = AddPost::with('user')->findOrFail($id);  
        return response()->json($post);  
    }  

    public function update(Request $request, $id)  
    {  
        $post = AddPost::findOrFail($id);  

        $request->validate([  
            'title' => 'sometimes|required|string|max:255',  
            'content' => 'sometimes|required|string',  
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',  
        ]);  

        if ($request->hasFile('images')) {  
            // Delete old images if necessary  
            $oldImages = json_decode($post->images, true);  
            foreach ($oldImages as $oldImage) {  
                Storage::disk('public')->delete($oldImage);  
            }  

            $imagePaths = [];  
            foreach ($request->file('images') as $image) {  
                $imagePaths[] = $image->store('images', 'public');  
            }  
            $post->images = json_encode($imagePaths);  
        }  

        $post->update($request->only(['title', 'content']));  

        return response()->json($post);  
    }  

    public function destroy($id)  
    {  
        $post = AddPost::findOrFail($id);  
        
        // Delete images from storage  
        $oldImages = json_decode($post->images, true);  
        foreach ($oldImages as $oldImage) {  
            Storage::disk('public')->delete($oldImage);  
        }  

        $post->delete();  
        return response()->json(null, 204);  
    }  
}