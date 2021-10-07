<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ApiProductController;
use App\Http\Controllers\CartController;
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
Route::resource('product', 'ApiProductController')->only(
    [
        'index', 'show', 'update'
    ]
);
Route::resource('products/{product}/comments', 'CommentController')->only(
    [
         'index', 'show', 'store'
    ]
);

Route::resource('telegram', 'CartController')->only(
    [
        'store'
    ]
);
