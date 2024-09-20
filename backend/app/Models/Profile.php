<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

     // Specify the table if it's not the plural form of the model name  
     protected $table = 'profiles';  

     // Specify the fillable fields for mass assignment  
     protected $fillable = [  
         'name',  
         'bio',  
     ];  
 }  

