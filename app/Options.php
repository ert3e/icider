<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Options extends Model
{
    public function productOptions(){
        return $this->hasMany(ProductOptions::class);
    }
}
