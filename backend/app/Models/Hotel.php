<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hotel extends Model
{
    protected $fillable = [
        'name',
        'address',
        'cost_per_night',
        'available_rooms',
        'image',
        'rating',
    ];
}
