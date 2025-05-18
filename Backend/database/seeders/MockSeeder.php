<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MockSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            EventCategorySeeder::class,
        ]);
    }
}
