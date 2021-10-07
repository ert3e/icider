<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'MainPageController@index')->name('main');
Route::get('/product/{id}', 'ShopController@show')->name('shop');
Route::get('/cart', 'CartController@index')->name('cart');
Route::get('/lid', 'LidController@index')->name('lid');
Route::view('/product', 'product');
Route::view('/checkout', 'checkout');
Route::get('/Shipping-and-payment', 'ShippingPaymentController@index')->name('shipping');

Route::get('/about', 'AboutController@index')->name('about');
Route::get('/order', 'OrderController@index')->name('order');
Route::get('/trade', 'TradeController@index')->name('trade');

/*Route::group(['prefix' => 'shop'], function() {
    Route::post('cart/add', 'Shop\Cart@add')->name('shop.cart.add');
    Route::post('cart/delete', 'Shop\Cart@delete')->name('shop.cart.delete');
    Route::post('cart', 'Shop\Cart@reload')->name('shop.cart');
    Route::get('cart/count', 'Shop\Cart@count')->name('shop.cart.count');
    Route::post('cart/remove', 'Shop\Cart@remove')->name('shop.cart.remove');
    Route::post('cart/order', 'Shop\Cart@order')->name('shop.cart.order');
    Route::post('cart/order/pay/', 'Shop\Cart@pay')->name('shop.cart.pay');

});*/

Route::get('/migrate', function() {
    Artisan::call('migrate', array('--path' => 'app/migrations', '--force' => true));
    return "Cache is cleared";
});
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
\DB::listen(function($sql) {
    \Log::info($sql->sql);
    \Log::info($sql->bindings);
    \Log::info($sql->time);
});
Route::view('404', 'errors.code404');
