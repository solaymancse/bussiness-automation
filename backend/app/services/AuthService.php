<?php

namespace App\Services;


use App\Repository\AuthRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(protected AuthRepository $authService) {}

    public function login($request)
    {
        $credentials = $request->only(['email', 'password']);

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'token' => $token,
            'user' => Auth::user(),
            'message' => 'Login successful',
        ]);
    }
    public function register($data)
    {
        $data['password'] = Hash::make($data['password']);
        $user = $this->authService->register($data);

        $token = Auth::login($user);

        return response()->json([
            'status' => 201,
            'message' => 'Registration successful',
            'token' => $token,
            'data' => $user,
        ]);
    }
}
