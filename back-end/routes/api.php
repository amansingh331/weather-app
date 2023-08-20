<?php

use App\Http\Controllers\WeatherController;

Route::prefix('v1')->group(function () {
    Route::get('weather/{city}', [WeatherController::class, 'getWeatherData']);
});
