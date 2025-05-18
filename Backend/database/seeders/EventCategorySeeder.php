<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class EventCategorySeeder extends Seeder
{
    public function run(): void
    {
        EventCategory::insert([
            [
                'name'       => 'Интересы',
                'code'       => 'interests',
                'color'      => '#FF4373',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name'       => 'Движ',
                'code'       => 'moves',
                'color'      => '#FF43D0',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name'       => 'Саморазвитие',
                'code'       => 'development',
                'color'      => '#4369FF',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name'       => 'Социальные',
                'code'       => 'social',
                'color'      => '#FACD1C',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
