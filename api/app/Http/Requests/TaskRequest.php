<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
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
        return [
            'title' => 'required|max:100|unique:posts'
        ];
    }
    
    public function messages() {
        return [
            'title.unique:posts' => 'タイトルは既に使用されています',
        ];
    }    

    public function attributes()
    {
        return [
            'title' => 'タイトル',
        ];
    }
}
