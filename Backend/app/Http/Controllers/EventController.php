<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventResource;
use App\Http\Responses\ApiResponse;
use App\Models\Event;

class EventController extends Controller
{
    public function show(Event $event)
    {
        return new ApiResponse(new EventResource($event));
    }
}
