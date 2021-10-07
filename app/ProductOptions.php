<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductOptions extends Model
{
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function options()
    {
        return $this->belongsTo(Options::class);
    }
}
