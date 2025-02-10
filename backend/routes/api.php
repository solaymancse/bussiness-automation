<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\HotelController;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::post('/auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);

Route::group(['middleware' => ['api']], function () {
    Route::apiResource('/hotel', HotelController::class);
});
