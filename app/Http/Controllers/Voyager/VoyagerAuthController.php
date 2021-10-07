<?php

namespace App\Http\Controllers\Voyager;

use Illuminate\Http\Request;
use TCG\Voyager\Http\Controllers\VoyagerAuthController as BaseVoyagerAuthController;

class VoyagerAuthController extends BaseVoyagerAuthController
{
    protected function validateLogin(Request $request) {
        $request->validate([
            $this->username()=>'required|string',
            'password' => 'required|string'
        
        ]);
    }
}
