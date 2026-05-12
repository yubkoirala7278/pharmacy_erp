<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Helpers\SlugHelper;

class RoleService
{
    /**
     * Get all permissions grouped by their module/feature.
     */
    public function getPermissionsGrouped(): array
    {
        $permissions = Permission::all();

        $grouped = [];
        foreach ($permissions as $permission) {
            $module = trim((string) ($permission->group_name ?? '')) ?: explode('_', $permission->name)[1] ?? explode('_', $permission->name)[0] ?? 'General';

            if (! isset($grouped[$module])) {
                $grouped[$module] = [];
            }

            $grouped[$module][] = [
                'id' => $permission->id,
                'name' => $permission->name,
                'display_name' => $permission->display_name ?? ucfirst(str_replace('_', ' ', $permission->name)),
            ];
        }

        ksort($grouped);
        foreach ($grouped as &$permissionGroup) {
            usort($permissionGroup, fn($a, $b) => strcmp($a['display_name'], $b['display_name']));
        }
        unset($permissionGroup);

        return $grouped;
    }

    /**
     * Create a new role with permissions.
     */
    public function createRole(array $data): Role
    {
        // Create the role
        $role = Role::create([
            'slug'         => SlugHelper::generate(),
            'name' => $data['name'],
            'display_name' => $data['display_name'],
            'description' => $data['description'] ?? null,
        ]);

        // Assign permissions if provided
        if (! empty($data['permissions'])) {
            $this->assignPermissions($role, $data['permissions']);
        }

        return $role;
    }

    /**
     * Update an existing role with permissions.
     */
    public function updateRole(Role $role, array $data): Role
    {
        // Update role attributes
        $role->update([
            'display_name' => $data['display_name'],
            'description' => $data['description'] ?? null,
        ]);

        // Sync permissions
        if (isset($data['permissions'])) {
            $this->assignPermissions($role, $data['permissions']);
        }

        return $role;
    }

    /**
     * Assign permissions to a role.
     */
    public function assignPermissions(Role $role, array $permissionIds): void
    {
        $permissions = Permission::whereIn('id', $permissionIds)->pluck('name')->toArray();
        $role->syncPermissions($permissions);
    }

    /**
     * Delete a role.
     */
    public function deleteRole(Role $role): bool
    {
        // Detach all permissions
        $role->syncPermissions([]);

        // Delete the role
        return $role->delete();
    }

    /**
     * Get role with all relationships.
     */
    public function getRole(Role $role): Role
    {
        return $role->load('permissions', 'users');
    }

    /**
     * Get all roles with permissions count.
     */
    public function getAllRoles(): Collection
    {
        return Role::with('permissions')
            ->withCount('users')
            ->get();
    }
}
