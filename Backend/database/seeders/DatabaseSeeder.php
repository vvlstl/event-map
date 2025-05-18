<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\Tag;
use App\Models\RawEvent;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            MockSeeder::class,
            FakeSeeder::class
        ]);
    }
}
