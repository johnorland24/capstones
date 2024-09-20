<?php  

namespace App\Http\Controllers\API;  

use App\Http\Controllers\Controller;  
use App\Models\User;  
use Illuminate\Http\Request;  
use Illuminate\Support\Facades\Hash;  
use Illuminate\Support\Facades\Log;  

class UserController extends Controller  
{  
    public function store(Request $request)  
    {  
        $request->validate([  
            'name' => 'required|string|max:255',  
            'email' => 'required|string|email|max:255|unique:users',  
            'username' => 'required|string|max:255|unique:users',  
            'password' => 'required|string|min:8',  
            'profile_image' => 'nullable|image|mimes:jpg,png,jpeg,svg,webp,gif|max:2048'
        ]);  

        $user = User::create([  
            'name' => $request->name,  
            'email' => $request->email,  
            'username' => $request->username,  
            'password' => Hash::make($request->password),  
            'profile_image' => $request->file('profile_image')? $request->file('profile_image')->store('images') : null,   // Store the image in the 'images' folder
        ]);  

        return response()->json($user, 201);  
    }  

    // Get all users  
    public function index()  
{  
    $users = User::all()->map(function ($user) {  
        // If profile_image exists, create a full URL for it  
        if ($user->profile_image) {  
            $user->profile_image = url('storage/' . $user->profile_image);  
        }  
        return $user;  
    });  

    return response()->json($users);  
}
    // Get a single user  
    public function show($id)  
    {  
        $user = User::findOrFail($id);  
        // Create the full URL for the profile_image  
        if ($user->profile_image) {  
            $user->profile_image = url('storage/' . $user->profile_image);  
        }  
        return response()->json($user);  
    } 

    public function updateProfileImage(Request $request)  
    {  
        $payload = $request->validate([  
            "profile_image" => "required|image|mimes:jpg,png,jpeg,svg,webp,gif|max:2048"  
        ]);  

        try {  
            $user = $request->user();  
            $filename = $payload["profile_image"]->store("images_" . $user->id);  
            
            // Updating profile image in the database  
            User::where("id", $user->id)->update(["profile_image" => $filename]);  
            
            return response()->json(["image" => $filename], 200);  
        } catch (\Exception $err) {  
            Log::error("Profile image error => " . $err->getMessage());  
            return response()->json(["message" => "Something went wrong!"], 500);  
        }  
    }  

    public function destroy($id)  
    {  
        User::destroy($id);  
        return response()->json(null, 204);  
    }  
}