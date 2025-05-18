<?php

namespace App\Http\Controllers;

use App\Http\Resources\EventCategoryResource;
use App\Http\Resources\ExtendedEventCategoryResource;
use App\Http\Responses\ApiResponse;
use App\Models\EventCategory;
use Illuminate\Contracts\Support\Responsable;

class EventCategoryController extends Controller
{
    public function list(): Responsable
    {
        $list = EventCategory::all();
        $list = EventCategoryResource::collection($list);
        return new ApiResponse($list);
    }

    public function extendedList(): Responsable
    {
        $list = EventCategory::all();
        $list = ExtendedEventCategoryResource::collection($list);
        return new ApiResponse($list);
    }
}
