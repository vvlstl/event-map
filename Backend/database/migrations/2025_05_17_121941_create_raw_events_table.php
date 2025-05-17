<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('raw_events', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->text('raw_text')->nullable()->comment('Сырой HTML текст');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('raw_events');
    }
};
