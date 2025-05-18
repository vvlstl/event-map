<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\EventCategory;
use App\Models\RawEvent;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class FakeSeeder extends Seeder
{
    public function run(): void
    {
        $eventCategories = EventCategory::all();

        Event::factory(10)
            ->for($eventCategories->random(), 'category')
            ->for(RawEvent::factory()->create())
            ->has(Tag::factory()->count(3))
            ->create();
    }
}
