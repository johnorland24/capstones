<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()  
    {  
        Schema::create('profiles', function (Blueprint $table) {  
            $table->id();  
            $table->string('name'); // Name field  
            $table->text('bio'); // Bio field  
            $table->timestamps(); // Created at and updated at timestamps  
        });  
    }  


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
