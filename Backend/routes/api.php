<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::prefix('events')->group(function () {
    Route::get('{event}', [EventController::class, 'show']);
});

Route::prefix('categories')->group(function () {
    Route::get('list', [EventController::class, 'categoryList']);
});
