<?php
use Illuminate\Database\Migrations\Migration;  
use Illuminate\Database\Schema\Blueprint;  
use Illuminate\Support\Facades\Schema;  

class CreateAddPostsTable extends Migration  
{  
    public function up()  
    {  
        Schema::create('add_posts', function (Blueprint $table) {  
            $table->id();  
            $table->unsignedBigInteger('user_id'); // Foreign key if needed  
            $table->string('title');  
            $table->text('content');  
            $table->timestamps();  
        });  
    }  

    public function down()  
    {  
        Schema::dropIfExists('add_posts');  
    }  
}