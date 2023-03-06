<?php

namespace App\Http\Controllers;


use App\Http\Requests\LoginDataRequest;
use App\Http\Requests\NoteCreateDataRequest;
use App\Http\Requests\SigninDataRequest;
use App\Models\Note;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $response = [];
        try {
            $data = json_decode($request->getContent());
            $user = User::where('email', $data->email)->first();
            $code = 200;
            if ($user) {
                if (Hash::check($data->password, $user->password)) {
                    $token = $user->createToken("login_token");
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
            return response()->json($response, 500);
        }
    }

    public function signin(SigninDataRequest $request): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $user = new User();
            $code = 200;
            $user->fill($request->all());
            $user->saveOrFail();
            $token = $user->createToken("login_token");
            $response["status"] = 200;
            $response["data"]["token"] = $token->plainTextToken;

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr";
            return response()->json($response, 500);
        }
    }

    public function getNotes(): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $code = 200;
            $note = Note::whereFkIdUser(Auth::id())->where('is_archived', false)->orderByDesc('is_pinned')->get();
            $response['data'] = $note;
            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

    public function getNotesArchived(): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $code = 200;
            $note = Note::whereFkIdUser(Auth::id())->where('is_archived', true)->get();
            $response['data'] = $note;
            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

    public function createNote(NoteCreateDataRequest $request): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $note = new Note();
            $code = 200;
            $note->fill($request->all());
            $note->fk_id_user = Auth::id();
            $note->saveOrFail();
            $response['data'] = "¡Nota Creada!";

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

    public function modifyNote(NoteCreateDataRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $note = Note::find($id);
            $code = 200;
            $note->title = $request->title;
            $note->body = $request->body;
            $note->saveOrFail();
            $response['data'] = "¡Nota Actualizada!";

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

    public function pinNote(NoteCreateDataRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $code = 200;
            $note = Note::find($id);
            $note->is_pinned = !$note->is_pinned;
            $note->saveOrFail();
            $response['data'] = "¡Nota Archivada!";

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

    public function archiveNote($id): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $code = 200;
            $note = Note::find($id);
            $note->is_archived = !$note->is_archived;
            $note->saveOrFail();
            $response['data'] = "¡Nota Archivada!";

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

    public function deleteNote($id): \Illuminate\Http\JsonResponse
    {
        $response = [];
        try {
            $code = 200;
            $note = Note::find($id);
            $note->delete();
            $response['data'] = "¡Nota Borrada!";

            return response()->json($response, $code);
        } catch (\Exception $ex) {
            $response["error"] = "Error en servidor, contecte a administradpr && " . $ex;
            return response()->json($response, 500);
        } catch (\Throwable $e) {
            $response["error"] = "Error al guardar nota && " . $e;
            return response()->json($response, 500);
        }
    }

}
