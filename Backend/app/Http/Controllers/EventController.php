<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventCategoryResource;
use App\Http\Resources\EventResource;
use App\Http\Responses\ApiResponse;
use App\Models\Event;
use App\Models\EventCategory;
use Illuminate\Contracts\Support\Responsable;

class EventController extends Controller
{
    public function detail(Event $event): Responsable
    {
        return new ApiResponse(new EventResource($event));
    }

    public function categoryList(): Responsable
    {
        return new ApiResponse(EventCategoryResource::collection(EventCategory::all()));
    }
}
