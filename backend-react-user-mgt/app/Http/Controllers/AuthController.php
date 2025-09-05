<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\LogoutRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {

        $data = $request->validated();

        #create user
        $user = User::create($data);

        #generate token
        $token = $user->createToken('auth-token');
        $token->delete();
        $token = $token->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ],201);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        #check if user exists
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        #generate token
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ],200);
    }

    public function logout(LogoutRequest $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ],204);
    }
}
