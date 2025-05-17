<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;

Route::prefix('event')->group(function () {
    Route::get('{event}', [EventController::class, 'detail']);
});

Route::prefix('category')->group(function () {
    Route::get('list', [EventController::class, 'categoryList']);
});
