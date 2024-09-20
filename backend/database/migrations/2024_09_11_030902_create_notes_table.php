<?php

use Illuminate\Database\Migrations\Migration;  
use Illuminate\Database\Schema\Blueprint;  
use Illuminate\Support\Facades\Schema;  

class CreateNotesTable extends Migration  
{  
    public function up()  
    {  
        Schema::create('notes', function (Blueprint $table) {  
            $table->id();  
            $table->string('title');  
            $table->text('content');  
            $table->timestamps();  
        });  
    }  

  
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
