<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('raw_events', function (Blueprint $table) {
            $table->timestamp('datetime');
            $table->string('source_name');
            $table->string('source_url');
        });
    }

    public function down(): void
    {
        Schema::table('raw_events', function (Blueprint $table) {
            $table->dropColumn('datetime');
            $table->dropColumn('source_name');
            $table->dropColumn('source_url');
        });
    }
};
