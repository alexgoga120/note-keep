<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class LoginDataRequest extends FormRequest
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
            'password' => 'required|max:15',
            'email' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'password.required' => 'Contraseña requerida',
            'password.max' => 'Contraseña max 15',
            'email.required' => 'Email requerido',
        ];
    }

}
