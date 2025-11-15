<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;

/**
 * Controller for managing users
 */
class UserController extends Controller
{
    /**
     * Get all users
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $users = User::with('role')
            ->select('id', 'name', 'email', 'role_id')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $users]);
    }

    /**
     * Get users by role
     *
     * @param string $role Role name (admin, agent, reporter)
     * @return JsonResponse
     */
    public function byRole(string $role): JsonResponse
    {
        // Find role by name
        $roleModel = \App\Models\Role::where('name', $role)->first();

        if (!$roleModel) {
            return response()->json(['error' => 'Role not found'], 404);
        }

        $users = User::with('role')
            ->where('role_id', $roleModel->id)
            ->select('id', 'name', 'email', 'role_id')
            ->orderBy('name')
            ->get();

        return response()->json(['data' => $users]);
    }

    /**
     * Get single user
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $user = User::with('role')->find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role_id' => $user->role_id,
                'role' => $user->role,
            ]
        ]);
    }
}
