<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    public function index()
    {
        return response()->json(Profile::all(), 200);
    }

    public function show($id)
    {
        $profile = Profile::find($id);
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }
        return response()->json($profile, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'required|string',
        ]);

        $profile = Profile::create($request->all());
        return response()->json($profile, 201);
    }

    public function update(Request $request, $id)
    {
        $profile = Profile::find($id);
        if (!$profile) {
            return response()->json(['message' => 'Profile not found'], 404);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'bio' => 'required|string',
        ]);

        $profile->update($request->all());

        Log::info('Profile updated', ['id' => $id, 'data' => $request->all()]);
        return response()->json($profile, 200);
    }

    public function destroy($id)
    {
        try {
            $profile = Profile::findOrFail($id);
            $profile->delete();

            return response()->json(['message' => 'Profile deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete profile'], 500);
        }
    }
}
