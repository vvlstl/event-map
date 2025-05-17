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
            EventCategorySeeder::class,
        ]);

        $eventCategories = EventCategory::all();

        Event::factory(10)
            ->for($eventCategories->random(), 'category')
            ->for(RawEvent::factory()->create())
            ->has(Tag::factory()->count(3))
            ->create();
    }
}
