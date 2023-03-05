<?php

namespace App\Http\Controllers;


use App\Http\Requests\LoginDataRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{

    public function users(Request $request)
    {
        $users = User::all();
        return response()->json($users);
    }

    public function login(LoginDataRequest $request): \Illuminate\Http\JsonResponse
    {
        $response = ["error" => ""];
        try {
            $data = json_decode($request->getContent());
            $user = User::where('email', $data->email)->first();
            $code = 200;
            if ($user) {
                if (Hash::check($data->password, $user->password)) {
                    $token = $user->createToken("example");
                    $response["status"] = 200;
                    $response["data"]["token"] = $token->plainTextToken;

                } else {
                    $response["error"] = "Credenciales incorrectas.";
                    $code = 215;
                }

            } else {
                $response["error"] = "Usuario no encontrado.";
                $code = 215;
            }

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr";
            return response(status: 500)->json($response, 500);
        }
    }

}
