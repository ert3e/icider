<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class  CommentRequest extends FormRequest
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

            'name'  => 'required|max:100|min:2',
            'text' => 'required|min:10',
	        'phone' => 'required|max:12|min:10',
            'rating' => '',
            'disadvantages'  => 'max:500',
            'advantages' => 'max:500',
        ];
        switch ($this->getMethod())
        {
            case 'POST':
                return $rules;
            case 'PUT':
                return $rules;
            case 'DELETE':
                return $rules;
        }
    }
    public function messages()
    {
        return [
            'name.required' => 'A name is required!',
            'name.max' => 'A name is max 100 symbols!',
            'name.min' => 'A name is min 2 symbols!',
            'text.min'  => 'A text is min 10 symbols!',
            'text.required'  => 'A text is required!',
            'phone.max'  => 'A phone is max 12 numbers!',
            'phone.min'  => 'A phone is max 10 numbers!',
            'phone.required'  => 'A phone is required!',
            'disadvantages.max'  => 'A name is max 500 symbols!',
            'advantages.max'  => 'A name is max 500 symbols!',
        ];
    }
}
