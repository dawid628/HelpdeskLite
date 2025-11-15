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

Route::middleware(['auth:sanctum'])->prefix('tickets')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::get('/', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/{id}', [TicketController::class, 'show'])->name('tickets.show');
    Route::post('/', [TicketController::class, 'store'])->name('tickets.store');
    Route::patch('/{id}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('/{id}', [TicketController::class, 'destroy'])->name('tickets.destroy');

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/role/{role}', [UserController::class, 'byRole']);
    });
});
