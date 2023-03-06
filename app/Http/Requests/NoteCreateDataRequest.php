<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NoteCreateDataRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'title' => 'max:30',
            'body' => 'max:255'
        ];
    }

    public function messages()
    {
        return [
            'title.max' => 'Título max 30 caracteres',
            'body.max' => 'Nota max 255 caracteres',
        ];
    }
}
