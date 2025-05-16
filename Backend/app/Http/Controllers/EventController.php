<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Models\Event;

class EventController extends Controller
{
    public function show(Event $event)
    {
        return new EventResource($event);
    }
}
