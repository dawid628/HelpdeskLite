<?php

use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function (Request $request) {
    return response()->json([
        'message' => 'Hello from Laravel!'
    ]);
});

Route::middleware(['auth:sanctum'])->prefix('tickets')->group(function () {
    Route::get('/', [TicketController::class, 'index'])->name('tickets.index');
    Route::get('/{id}', [TicketController::class, 'show'])->name('tickets.show');
    Route::post('/', [TicketController::class, 'store'])->name('tickets.store');
    Route::put('/{id}', [TicketController::class, 'update'])->name('tickets.update');
    Route::delete('/{id}', [TicketController::class, 'destroy'])->name('tickets.destroy');
});
