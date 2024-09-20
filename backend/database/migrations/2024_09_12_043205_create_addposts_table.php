<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addposts', function (Blueprint $table) {
            $table->id(); // Auto-incrementing post ID  
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Foreign key to the users table  
            $table->string('title');  
            $table->text('content');  
            $table->json('images')->nullable(); // Storing image paths in JSON format  
            $table->json('comments')->nullable(); // Store comments as JSON if you wish to allow variable format  
            $table->integer('likes')->default(0); // Like count  
            $table->timestamps(); // created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addposts');
    }
};
