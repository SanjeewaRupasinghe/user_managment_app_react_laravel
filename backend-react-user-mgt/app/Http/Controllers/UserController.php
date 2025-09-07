<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // TODO: Implement comments
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => User::all(),
        ]);
    }

    // /**
    //  * Show the form for creating a new resource.
    //  */
    // public function create()
    // {
    //     return response()->json([
    //         'status' => 'success',
    //         'data' => User::create(),
    //     ]);
    // }

    // TODO: Implement comments
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());

        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }

    // TODO: Implement comments
    public function show(User $user)
    {
        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  */
    // public function edit(User $user)
    // {
    //     return response()->json([
    //         'status' => 'success',
    //         'data' => $user,
    //     ]);
    // }

    // TODO: Implement comments
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update(
            [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]
        );

        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }

    // TODO: Implement comments
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }
}
