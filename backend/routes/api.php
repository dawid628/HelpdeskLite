<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);


Route::get('/test', function (Request $request) {
    return response()->json([
        'message' => 'Hello from Laravel!'
    ]);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('tickets', TicketController::class);
    Route::post('/tickets/{id}/triage-suggest', [TicketController::class, 'triageSuggest']);
    Route::get('/tickets/tags', [TicketController::class, 'tags']);

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::get('/role/{role}', [UserController::class, 'byRole']);
    });
});
