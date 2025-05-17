<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->foreignId('category_id')->constrained('event_categories', 'id');
            $table->foreignId('raw_event_id')->constrained('raw_events', 'id');
        });
    }

    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign('events_category_id_foreign');
            $table->dropColumn('category_id');
            $table->dropForeign('events_raw_event_id_foreign');
            $table->dropColumn('raw_event_id');
        });
    }
};
