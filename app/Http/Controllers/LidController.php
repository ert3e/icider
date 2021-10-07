<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LidController extends Controller
{
    public function index(){
        return view('lid');
    }
}
