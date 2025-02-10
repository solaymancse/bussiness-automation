<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService) {}
    
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json([
                'status'=> 401,
                'message'=> "Unauthorized"
            ]);
        }

        return response()->json([
            'token' => $token,
            'user' => Auth::user(),
            'message' => 'Login successful',
        ]);
    }

    public function register(RegisterRequest $request)
    {
        return $this->authService->register($request->all());
    }
}
