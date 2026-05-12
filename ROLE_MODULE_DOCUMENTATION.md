# Role Management Module Documentation

## Overview

The Role Management Module provides a complete system for creating, managing, and assigning roles with granular permissions to users in the PharmERP system. This module leverages the Spatie Laravel Permission package for robust permission handling.

## Features

✅ **Create Roles** - Create new roles with custom display names and descriptions  
✅ **Assign Permissions** - Assign multiple permissions to roles with easy selection UI  
✅ **Update Roles** - Edit existing roles and modify their permissions  
✅ **Delete Roles** - Remove roles (with safety checks)  
✅ **Search & Filter** - Find roles by name or display name  
✅ **Permission Grouping** - Permissions grouped by module for better organization  
✅ **Validation** - Comprehensive server-side validation  
✅ **Professional UI** - Modern, responsive interface with Tailwind CSS  

## Architecture

### Components

1. **Controller** (`app/Http/Controllers/Admin/RoleController.php`)
   - Handles all HTTP requests for role management
   - Methods: `index`, `create`, `store`, `edit`, `update`, `destroy`

2. **Service** (`app/Services/RoleService.php`)
   - Business logic for role operations
   - Handles role creation, updates, deletion, and permission management
   - Methods: `createRole`, `updateRole`, `deleteRole`, `assignPermissions`, `getPermissionsGrouped`

3. **Validation Requests**
   - `app/Http/Requests/StoreRoleRequest.php` - Validates role creation
   - `app/Http/Requests/UpdateRoleRequest.php` - Validates role updates

4. **Views (JSX)**
   - `Index.jsx` - List all roles with search
   - `Create.jsx` - Create new role form
   - `Edit.jsx` - Edit existing role form

5. **Layout**
   - `resources/js/Layouts/AdminLayout.jsx` - Admin panel layout with sidebar

## File Structure

```
app/
  ├── Http/
  │   ├── Controllers/Admin/
  │   │   └── RoleController.php
  │   └── Requests/
  │       ├── StoreRoleRequest.php
  │       └── UpdateRoleRequest.php
  ├── Services/
  │   └── RoleService.php
resources/js/
  ├── Layouts/
  │   └── AdminLayout.jsx
  └── Pages/Admin/Roles/
      ├── Index.jsx
      ├── Create.jsx
      └── Edit.jsx
routes/
  └── admin.php (Updated with role routes)
database/seeders/
  └── PermissionSeeder.php (Updated with permissions)
```

## Routes

All routes are protected with `auth` middleware and require appropriate permissions:

```php
// Route prefix: /admin/roles
GET    /admin/roles              - List roles (roles.view)
GET    /admin/roles/create       - Show create form (roles.create)
POST   /admin/roles              - Store new role (roles.create)
GET    /admin/roles/{id}/edit    - Show edit form (roles.edit)
PUT    /admin/roles/{id}         - Update role (roles.edit)
DELETE /admin/roles/{id}         - Delete role (roles.delete)
```

## Usage

### 1. Access Role Management

Navigate to `/admin/roles` in your application.

### 2. Create a New Role

1. Click "Create Role" button
2. Enter Role Name (e.g., `manager_pharmacist`)
   - Must be lowercase with underscores
   - Automatically converted from spaces to underscores
3. Enter Display Name (e.g., `Manager Pharmacist`)
4. Add optional Description
5. Select permissions from expanded modules
6. Click "Create Role"

### 3. Assign Permissions

- Click module header to expand/collapse
- Select individual permissions or click module checkbox to select all
- Count indicator shows selected permissions per module
- Permissions are grouped by module (Roles, Users, Medicines, Inventory, Sales, Reports)

### 4. Edit a Role

1. Click "Edit" on any role
2. Modify display name and description
3. Update permissions as needed
4. Click "Save Changes"

### 5. Delete a Role

1. Click "Edit" on the role
2. Click "Delete Role" button (not available for system roles)
3. Confirm deletion in the modal

## Validation Rules

### Create Role Request (StoreRoleRequest)

| Field | Rules | Messages |
|-------|-------|----------|
| `name` | required, string, max:255, lowercase, regex (a-z_), unique | Role names must be unique and contain only lowercase letters and underscores |
| `display_name` | required, string, max:255 | Display name is required |
| `description` | nullable, string, max:1000 | Description must not exceed 1000 characters |
| `permissions` | nullable, array | - |
| `permissions.*` | integer, exists:permissions,id | Selected permissions must exist |

### Update Role Request (UpdateRoleRequest)

| Field | Rules |
|-------|-------|
| `display_name` | required, string, max:255 |
| `description` | nullable, string, max:1000 |
| `permissions` | nullable, array |
| `permissions.*` | integer, exists:permissions,id |

## Default Roles & Permissions

The seeder creates 4 default roles:

### Super Administrator (`super_admin`)
- Full access to all features
- Cannot be deleted
- Permissions: All

### Administrator (`admin`)
- Most permissions except user deletion and system settings
- Can manage roles and permissions
- Permissions: All except some restricted ones

### Pharmacist (`pharmacist`)
- Sales and inventory access
- Can view reports and manage purchases
- Permissions: Limited to pharmacy operations

### Staff Member (`staff`)
- Basic access to POS and viewing
- Permissions: Limited to basic operations

## Available Permissions

Permissions are grouped by module:

### Roles Module
- `view_roles` - View all roles
- `create_roles` - Create new roles
- `edit_roles` - Edit existing roles
- `delete_roles` - Delete roles

### Users Module
- `view_users` - View all users
- `create_users` - Create new users
- `edit_users` - Edit user information
- `delete_users` - Delete users

### Medicines Module
- `view_medicines` - View medicines
- `create_medicines` - Add new medicines
- `edit_medicines` - Edit medicine details
- `delete_medicines` - Remove medicines

### Inventory Module
- `view_inventory` - View inventory status
- `manage_inventory` - Manage stock levels

### Sales Module
- `view_sales` - View sales records
- `create_sales` - Create new sales
- `edit_sales` - Edit sales information

### Reports Module
- `view_reports` - View reports
- `export_reports` - Export report data

## Security Features

1. **Authorization Checks**
   - Each action requires specific permission
   - Permissions checked at controller level
   - Form requests validate user authorization

2. **Validation**
   - Server-side validation for all inputs
   - Unique role name validation
   - Permission ID validation

3. **Protected Roles**
   - `super_admin` role cannot be edited or deleted
   - System roles have safeguards

4. **Safety Checks**
   - Cannot delete roles with assigned users
   - Confirmation modal for deletion
   - Error messages for all failures

## Database Seeding

Run the permission seeder to set up roles and permissions:

```bash
php artisan db:seed --class=PermissionSeeder
```

Or seed all data:

```bash
php artisan db:seed
```

## API Response Format

### List Roles (Index)

```json
{
  "data": [
    {
      "id": 1,
      "name": "admin",
      "display_name": "Administrator",
      "description": "Administrator role",
      "created_at": "2026-05-11T10:00:00Z",
      "permissions": [
        { "id": 1, "name": "view_roles" },
        { "id": 2, "name": "create_roles" }
      ]
    }
  ],
  "current_page": 1,
  "last_page": 1,
  "per_page": 15,
  "total": 1
}
```

## Error Handling

### Common Errors

1. **"Cannot delete the Super Admin role"**
   - System role protection
   - Solution: Use a different role

2. **"Cannot delete role with assigned users"**
   - Role is in use
   - Solution: Remove users from role first

3. **"The role name must be lowercase with underscores only"**
   - Invalid name format
   - Solution: Use format like `my_role_name`

4. **"A role with this name already exists"**
   - Duplicate role name
   - Solution: Use a unique name

## Usage Example in Code

### Check Permission in Controller

```php
public function someMethod(Request $request)
{
    // Check using middleware
    $this->authorize('create', Role::class);
    
    // Or check using permission
    if (!$request->user()->can('create_roles')) {
        abort(403);
    }
}
```

### Assign Role to User

```php
use Spatie\Permission\Models\Role;

$role = Role::findByName('pharmacist');
$user->assignRole($role);
```

### Check Role or Permission

```php
// Check role
if ($user->hasRole('admin')) {
    // User is admin
}

// Check permission
if ($user->can('create_roles')) {
    // User can create roles
}
```

## Performance Considerations

1. **Eager Loading** - Permissions loaded with roles to avoid N+1 queries
2. **Caching** - Spatie Permission uses Laravel cache
3. **Pagination** - Roles list paginated at 15 per page
4. **Search** - Database-level search for scalability

## Customization

### Add Custom Permissions

In `database/seeders/PermissionSeeder.php`:

```php
$permissions = [
    'my_module' => [
        ['name' => 'my_module.view', 'display_name' => 'View My Module'],
        ['name' => 'my_module.manage', 'display_name' => 'Manage My Module'],
    ],
];
```

### Modify UI Styling

Edit JSX files in `resources/js/Pages/Admin/Roles/` - Uses Tailwind CSS classes.

### Extend RoleService

Add custom methods to `RoleService` for additional business logic.

## Testing

To test the role module:

1. Create a test role
2. Assign permissions
3. Create a test user
4. Assign the role to user
5. Verify permissions work

## Troubleshooting

### Permissions Not Updating
- Clear cache: `php artisan permission:cache-reset`
- Verify `PermissionSeeder` was run

### Role Not Appearing
- Check database connection
- Verify migration was executed
- Check for permission-related errors in logs

### UI Not Responsive
- Clear browser cache
- Rebuild Vite: `npm run dev`
- Check console for JavaScript errors

## Support & Maintenance

- Review logs in `storage/logs/`
- Check database for data consistency
- Keep permissions in sync with features
- Regularly audit role assignments

---

**Last Updated:** May 11, 2026  
**Version:** 1.0.0
