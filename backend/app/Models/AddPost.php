<?php  

namespace App\Models;  

use Illuminate\Database\Eloquent\Factories\HasFactory;  
use Illuminate\Database\Eloquent\Model;  

class AddPost extends Model  
{  
    use HasFactory;  

    protected $fillable = [  
        'user_id',  
        'title',  
        'content',  
        'images',  
        'comments',  
        'likes',  
    ];  

    protected $casts = [  
        'images' => 'array',  
        'comments' => 'array',  
    ];  

    // Define the relationship with the User model  
    public function user()  
    {  
        return $this->belongsTo(User::class);  
    }  
}