<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

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
            // Dashboard
            'view_dashboard',

            // Medicines
            'view_medicines',
            'create_medicines',
            'edit_medicines',
            'delete_medicines',

            // Categories
            'view_categories',
            'create_categories',
            'edit_categories',
            'delete_categories',

            // Suppliers
            'view_suppliers',
            'create_suppliers',
            'edit_suppliers',
            'delete_suppliers',

            // Purchase Orders
            'view_purchase_orders',
            'create_purchase_orders',
            'edit_purchase_orders',
            'delete_purchase_orders',

            // Stock Alerts
            'view_stock_alerts',
            'manage_stock_alerts',

            // Point of Sale
            'access_pos',
            'create_sales',

            // Sales
            'view_sales',
            'edit_sales',
            'delete_sales',

            // Prescriptions
            'view_prescriptions',
            'create_prescriptions',
            'edit_prescriptions',
            'delete_prescriptions',

            // Customers
            'view_customers',
            'create_customers',
            'edit_customers',
            'delete_customers',

            // Reports
            'view_reports',
            'export_reports',

            // Expenses
            'view_expenses',
            'create_expenses',
            'edit_expenses',
            'delete_expenses',

            // Invoices
            'view_invoices',
            'create_invoices',
            'edit_invoices',
            'delete_invoices',

            // Staff
            'view_staff',
            'create_staff',
            'edit_staff',
            'delete_staff',

            // Settings
            'manage_settings',
            'manage_roles',
            'manage_permissions',
        ];

        // Create all permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create admin role and assign all permissions
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions(Permission::all());

        // Create super-admin role with all permissions
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->syncPermissions(Permission::all());
    }
}
