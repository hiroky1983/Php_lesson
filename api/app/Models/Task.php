<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fileable = ['title', 'is_done'];
    protected $casts = ['is_done' => 'bool',];
}
