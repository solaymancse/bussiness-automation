<?php

namespace App\Repository;

use App\Models\User;
use PHPUnit\Metadata\Uses;

class AuthRepository
{
    public function register($data)
    {
        return User::create($data);
    }
}
