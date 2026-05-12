<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Services\RoleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct(protected RoleService $roleService) {}

    /**
     * Display a listing of the roles.
     */
    public function index(Request $request): Response
    {
        $roles = Role::with('permissions')
            ->when(
                $request->search,
                fn($q, $s) =>
                $q->where('name', 'like', "%{$s}%")
                    ->orWhere('display_name', 'like', "%{$s}%")
            )
            ->when(
                $request->sort_field,
                fn($q) =>
                $q->orderBy($request->sort_field, $request->sort_order ?? 'asc'),
                fn($q) => $q->orderBy('name', 'asc')
            )
            ->paginate(15);

        return Inertia::render('Admin/Roles/Index', [
            'roles'   => $roles,
            'filters' => $request->only(['search', 'sort_field', 'sort_order']),
        ]);
    }

    /**
     * Show the form for creating a new role.
     */
    public function create(): Response
    {
        $permissions = $this->roleService->getPermissionsGrouped();

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created role in storage.
     */
    public function store(StoreRoleRequest $request)
    {
        try {
            $role = $this->roleService->createRole(
                $request->validated()
            );

            return redirect()
                ->route('admin.roles.index')
                ->with('success', "Role '{$role->display_name}' created successfully.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to create role: ' . $e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified role.
     */
    public function edit(Role $role): Response
    {
        $permissions = $this->roleService->getPermissionsGrouped();
        $rolePermissions = $role->permissions()->pluck('id')->toArray();

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
            'rolePermissions' => $rolePermissions,
        ]);
    }

    /**
     * Update the specified role in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role)
    {
        try {
            $this->roleService->updateRole($role, $request->validated());

            return redirect()
                ->route('admin.roles.index')
                ->with('success', "Role '{$role->display_name}' updated successfully.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to update role: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified role from storage.
     */
    public function destroy(Role $role)
    {
        try {
            // Prevent deletion of super admin role
            if ($role->name === 'super_admin') {
                return redirect()
                    ->back()
                    ->with('error', 'Cannot delete the Super Admin role.');
            }

            // Check if role is assigned to users
            if ($role->users()->exists()) {
                return redirect()
                    ->back()
                    ->with('error', 'Cannot delete role with assigned users.');
            }

            $this->roleService->deleteRole($role);

            return redirect()
                ->route('admin.roles.index')
                ->with('success', "Role '{$role->display_name}' deleted successfully.");
        } catch (\Exception $e) {
            return redirect()
                ->back()
                ->with('error', 'Failed to delete role: ' . $e->getMessage());
        }
    }
}
