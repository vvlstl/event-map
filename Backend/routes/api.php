<?php

use App\Http\Controllers\EventCategoryController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RawEventController;
use Illuminate\Support\Facades\Route;

Route::prefix('event')->group(function () {
    Route::post('save', [EventController::class, 'save']);
    Route::get('list', [EventController::class, 'list']);
    Route::get('{event}', [EventController::class, 'detail']);
});

Route::prefix('event/raw')->group(function () {
    Route::get('{rawEvent}', [RawEventController::class, 'detail']);
    Route::post('save', [RawEventController::class, 'save']);
});

Route::prefix('category')->group(function () {
    Route::get('list', [EventCategoryController::class, 'list']);
});
