<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class MainPageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::get();
        return view('main')->with('products', $products);
    }

}
