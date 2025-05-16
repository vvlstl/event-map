<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        return [
            'title'      => $this->faker->word(),
            'address'    => $this->faker->address(),
            'latitude'   => $this->faker->latitude(),
            'longitude'  => $this->faker->longitude(),
            'url'        => $this->faker->url(),
            'datetime'   => $this->faker->dateTime(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
