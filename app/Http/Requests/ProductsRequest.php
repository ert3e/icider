<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class ProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'title' => 'string',
            'description' => '',
            'article' => '',
            'desc' => '',
            'keywords' => '',
            'name' => '',
            'card_name' => '',
            'specifications' => '',
            'cost' => '',
            'order' => '',
            'img' => '',
            'count_view' => 'integer',
            'discount' => ''
        ];
        switch ($this->getMethod())
        {
            case 'GET':
                return $rules;
            case 'POST':
                return $rules;
            case 'PUT':
                return  $rules; // и берем все остальные правила
            // case 'PATCH':
            case 'DELETE':
                return [
                    'id' => 'required|integer|exists:product,id'
                ];
        }
        return $rules;
    }
}
