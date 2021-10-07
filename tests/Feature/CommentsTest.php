<?php

namespace Tests\Feature;

use App\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CommentsTest extends TestCase
{
    /**
     * Commet add test case
     *
     * @test
     */
  public function it_can_post_a_new_comment_to_a_product()
  {
      $this->withoutExceptionHandling();
      // arrange
      $product = Product::where('id', '2')->first();
      $response = $this->json('post', "/api/products/{$product->id}/comments",[
          'text' => 'test comments'
      ]);
      $response->assertOk();
      $this->assertEquals($product->comments()->count(), $product->comments()->count());
      $comment = $product->comments()->first();
      $this->assertEquals('test comments', $comment->text);
  }
}
