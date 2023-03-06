<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/notes', [ApiController::class, 'getNotes']);
    Route::get('/notes/archived', [ApiController::class, 'getNotesArchived']);

    Route::delete('/notes/{id}', [ApiController::class, 'deleteNote']);
//
    Route::put('/notes/{id}', [ApiController::class, 'modifyNote']);

    Route::post('/notes', [ApiController::class, 'createNote']);
    Route::post('/notes/{id}/archived', [ApiController::class, 'archiveNote']);
    Route::post('/notes/{id}/pin', [ApiController::class, 'pinNote']);
});

Route::get('/users', [ApiController::class, 'users']);
Route::post('/login', [ApiController::class, 'login']);
Route::post('/signin', [ApiController::class, 'signin']);
