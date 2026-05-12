<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Helpers\SlugHelper;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        $permissions = [
            'Dashboard' => [
                'view_dashboard',
            ],
            'Medicines' => [
                'view_medicines',
                'create_medicines',
                'edit_medicines',
                'delete_medicines',
            ],
            'Categories' => [
                'view_categories',
                'create_categories',
                'edit_categories',
                'delete_categories',
            ],
            'Suppliers' => [
                'view_suppliers',
                'create_suppliers',
                'edit_suppliers',
                'delete_suppliers',
            ],
            'Purchase Orders' => [
                'view_purchase_orders',
                'create_purchase_orders',
                'edit_purchase_orders',
                'delete_purchase_orders',
            ],
            'Stock Alerts' => [
                'view_stock_alerts',
                'manage_stock_alerts',
            ],
            'Point Of Sale' => [
                'access_pos',
                'create_sales',
            ],
            'Sales' => [
                'view_sales',
                'edit_sales',
                'delete_sales',
            ],
            'Prescriptions' => [
                'view_prescriptions',
                'create_prescriptions',
                'edit_prescriptions',
                'delete_prescriptions',
            ],
            'Customers' => [
                'view_customers',
                'create_customers',
                'edit_customers',
                'delete_customers',
            ],
            'Reports' => [
                'view_reports',
                'export_reports',
            ],
            'Expenses' => [
                'view_expenses',
                'create_expenses',
                'edit_expenses',
                'delete_expenses',
            ],
            'Invoices' => [
                'view_invoices',
                'create_invoices',
                'edit_invoices',
                'delete_invoices',
            ],
            'Staff' => [
                'view_staff',
                'create_staff',
                'edit_staff',
                'delete_staff',
            ],
            'Settings' => [
                'manage_settings',
                'manage_roles',
                'manage_permissions',
            ],
            'Roles' => [
                'view_roles',
                'create_roles',
                'edit_roles',
                'delete_roles',
            ],
            'Users' => [
                'view_users',
                'create_users',
                'edit_users',
                'delete_users',
            ],
        ];

        // Create all permissions
        foreach ($permissions as $group => $permissionNames) {
            foreach ($permissionNames as $permissionName) {
                $permission = Permission::firstOrCreate(
                    ['name' => $permissionName],
                    ['group_name' => $group],
                );

                if ($permission->group_name !== $group) {
                    $permission->group_name = $group;
                    $permission->save();
                }
            }
        }

        // Create super-admin role with all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin'], [
            'slug'         => SlugHelper::generate(),
            'display_name' => 'Super Administrator',
            'description' => 'Full access to all system features'
        ]);
        $superAdminRole->syncPermissions(Permission::all());

        // Create admin role
        $adminRole = Role::firstOrCreate(['name' => 'admin'], [
            'display_name' => 'Administrator',
            'description' => 'Administrator with most permissions'
        ]);
        $adminPermissions = Permission::whereNotIn('name', [
            'delete_staff',
            'delete_roles',
            'manage_permissions',
            'manage_settings'
        ])->pluck('name');
        $adminRole->syncPermissions($adminPermissions);

        // Create pharmacist role
        $pharmacistRole = Role::firstOrCreate(['name' => 'pharmacist'], [
            'display_name' => 'Pharmacist',
            'description' => 'Pharmacist with sales and inventory access'
        ]);
        $pharmacistPermissions = Permission::whereIn('name', [
            'view_dashboard',
            'view_medicines',
            'view_categories',
            'view_suppliers',
            'view_purchase_orders',
            'create_purchase_orders',
            'view_stock_alerts',
            'access_pos',
            'create_sales',
            'view_sales',
            'edit_sales',
            'view_prescriptions',
            'create_prescriptions',
            'edit_prescriptions',
            'view_customers',
            'create_customers',
            'edit_customers',
            'view_reports',
            'export_reports',
            'view_invoices',
        ])->pluck('name');
        $pharmacistRole->syncPermissions($pharmacistPermissions);

        // Create staff role
        $staffRole = Role::firstOrCreate(['name' => 'staff'], [
            'display_name' => 'Staff Member',
            'description' => 'Staff member with limited permissions'
        ]);
        $staffPermissions = Permission::whereIn('name', [
            'view_dashboard',
            'view_medicines',
            'view_categories',
            'access_pos',
            'create_sales',
            'view_sales',
            'view_customers',
            'create_customers',
        ])->pluck('name');
        $staffRole->syncPermissions($staffPermissions);
    }
}
