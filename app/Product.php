<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Comment;
class Product extends Model
{
    protected $guarded = [];

    public function productOptions(){
        return $this->hasMany(ProductOptions::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
