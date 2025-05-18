<?php

namespace Database\Factories;

use App\Models\RawEvent;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class RawEventFactory extends Factory
{
    protected $model = RawEvent::class;

    public function definition(): array
    {
        return [
            'url'         => $this->faker->url(),
            'raw_text'    => $this->faker->text(),
            'source_url'  => $this->faker->url(),
            'source_name' => $this->faker->word(),
            'datetime'    => $this->faker->dateTime(),
            'created_at'  => Carbon::now(),
            'updated_at'  => Carbon::now(),
        ];
    }
}
