<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Google\Client as GoogleClient;
use Google\Service\Oauth2 as GoogleOauth2;
use Illuminate\Support\Facades\Auth;

class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        return response()->json([
            'url' => Socialite::driver('google')->stateless()->redirect()->getTargetUrl()
        ]);
    }

    public function handleGoogleCallback(Request $request)
    {
        $token = $request->input('token');

        if (!$token) {
            return response()->json(['error' => 'Token is missing'], 400);
        }

        try {
            $googleClient = new GoogleClient();
            $googleClient->setClientId(env('GOOGLE_CLIENT_ID'));
            $googleClient->setClientSecret(env('GOOGLE_CLIENT_SECRET'));

            $payload = $googleClient->verifyIdToken($token);

            if (!$payload) {
                return response()->json(['error' => 'Invalid Google token'], 400);
            }

            $googleUser = [
                'google_id' => $payload['sub'],
                'name' => $payload['name'],
                'email' => $payload['email'],
            ];

            // Create or update the user in the database
            $user = User::updateOrCreate(
                ['email' => $googleUser['email']],
                [
                    'name' => $googleUser['name'],
                    'google_id' => $googleUser['google_id'],
                    'password' => Hash::make($googleUser['google_id']), // Set a random password
                ]
            );

            return response()->json([
                'token' => $token,
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Google login failed', 'message' => $e->getMessage()], 500);
        }
    }
}
