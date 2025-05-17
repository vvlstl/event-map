<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('event_tags', function (Blueprint $table) {
            $table->foreignId('event_id')->constrained('events', 'id');
            $table->foreignId('tag_id')->constrained('tags', 'id');
            $table->primary(['event_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('event_tags');
    }
};
