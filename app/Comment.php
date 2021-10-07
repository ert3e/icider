<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * @var string[]
     */
    protected $fillable = ['created_at', 'products_id', 'name', 'text', 'approved', 'disadvantages', 'advantages', 'rating'];

    protected $hidden = ['updated_at', 'deleted_at'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
