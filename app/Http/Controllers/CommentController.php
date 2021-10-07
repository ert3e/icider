<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Product;
use Carbon\Carbon;
use App\Comment;

class CommentController extends Controller
{
    /**
     * @param Product $product
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(Product $product)
    {
        $comments = $product->comments()->get();

        return response()->json($comments);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentRequest $request,  Product $product)
    {
        $product =  $product->comments()->create(
            [
                'text' => $request->text,
                'name' => $request->name,
                'phone' => $request->phone,
                'rating' => $request->rating,
                'disadvantages' => $request->advantages,
                'advantages' => $request->advantages
            ]
        );
        return response()->json($product);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $comments = Comment::all();

        //$comments->time = Carbon::parse($comments->created_at);
        return $comments;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CommentRequest $request, $id)
    {

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
