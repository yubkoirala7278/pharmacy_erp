# Role Module - Quick Start Guide

## What Was Created

A complete, production-ready role management system with the following components:

### Backend Files Created

1. **Controller** - `app/Http/Controllers/Admin/RoleController.php`
   - 6 RESTful action methods
   - Full CRUD operations
   - Permission-based access control
   - Error handling and validation

2. **Service** - `app/Services/RoleService.php`
   - Business logic layer
   - Permission grouping
   - Role lifecycle management
   - Reusable methods

3. **Form Requests**
   - `app/Http/Requests/StoreRoleRequest.php` - Create validation
   - `app/Http/Requests/UpdateRoleRequest.php` - Update validation
   - Professional validation rules
   - Custom error messages

### Frontend Files Created

1. **AdminLayout** - `resources/js/Layouts/AdminLayout.jsx`
   - Responsive admin dashboard layout
   - Navigation sidebar with admin menu
   - Flash message display
   - User profile dropdown

2. **Role Pages** - `resources/js/Pages/Admin/Roles/`
   - `Index.jsx` - List roles with search and pagination
   - `Create.jsx` - Create role with permission assignment
   - `Edit.jsx` - Edit role with delete confirmation
   - Professional Tailwind CSS styling

### Routes Updated

- `routes/admin.php` - Added 6 new RESTful routes under `/admin/roles`

### Database/Seeding Updated

- `database/seeders/PermissionSeeder.php` - Enhanced with:
  - Granular role-based permissions
  - 4 default roles (Super Admin, Admin, Pharmacist, Staff)
  - Proper permission assignment to each role

## Installation & Setup

### 1. Run Database Migration

The permission tables should already be created, but verify:

```bash
php artisan migrate
```

### 2. Seed Permissions & Roles

```bash
php artisan db:seed --class=PermissionSeeder
```

This creates:
- All permissions across modules
- 4 default roles with proper permissions
- Role-permission associations

### 3. Build Frontend Assets

```bash
npm run dev
# or for production
npm run build
```

### 4. Assign Role to User (in tinker or migration)

```bash
php artisan tinker

>>> $user = User::first();
>>> $user->assignRole('admin');
>>> exit
```

## Access the Module

### URL: `/admin/roles`

**Features:**
- List all roles with permission counts
- Search by role name or display name
- Create new roles
- Edit existing roles
- Delete roles (with safety checks)
- Assign/manage permissions with grouped display

## Default Users & Roles

After seeding, you'll have:

1. **Super Administrator** (`super_admin`)
   - All permissions
   - Cannot be deleted

2. **Administrator** (`admin`)
   - Most permissions
   - Can manage roles

3. **Pharmacist** (`pharmacist`)
   - Sales and inventory focused
   - Moderate permissions

4. **Staff** (`staff`)
   - Basic POS and viewing
   - Limited permissions

## Security & Authorization

All role management actions require proper permissions:

| Action | Permission Required | Authorization |
|--------|-------------------|-----------------|
| View Roles | `view_roles` | StoreRoleRequest |
| Create Role | `create_roles` | StoreRoleRequest |
| Edit Role | `edit_roles` | UpdateRoleRequest |
| Delete Role | `delete_roles` | Controller check |

## Key Features Implemented

✅ **Professional Code Structure**
- Service layer for business logic
- Form request validation
- Proper authorization checks
- Error handling and user feedback

✅ **User-Friendly Interface**
- Accordion-style permission grouping
- Checkbox selection with counters
- Search functionality
- Pagination support
- Responsive design

✅ **Validation**
- Role name format: lowercase with underscores
- Unique role name checking
- Permission ID validation
- Error messages display

✅ **Safety Features**
- Cannot delete super_admin role
- Cannot delete roles with assigned users
- Confirmation modal for deletions
- Flash messages for all actions

✅ **Performance**
- Eager loading of relationships
- Grouped permission retrieval
- Paginated role listing
- Database-level search

## Testing the Module

### 1. Create a Role

```
1. Go to /admin/roles
2. Click "Create Role"
3. Enter: 
   - Name: manager_pharmacist
   - Display: Manager Pharmacist
   - Description: Manages pharmacy operations
4. Select permissions for the role
5. Click "Create Role"
```

### 2. Assign to User

```bash
php artisan tinker
>>> $user = User::find(2);
>>> $user->assignRole('manager_pharmacist');
```

### 3. Test Permissions

```php
if ($user->can('view_roles')) {
    // Permission works!
}
```

## Code Quality

### Backend
- ✅ Type hints throughout
- ✅ Proper error handling
- ✅ Service pattern
- ✅ Validation requests
- ✅ Documentation comments

### Frontend
- ✅ React hooks (useState)
- ✅ Inertia.js integration
- ✅ Responsive Tailwind CSS
- ✅ Loading states
- ✅ Error display

## Customization Options

### Add Custom Permissions

Edit `database/seeders/PermissionSeeder.php`:

```php
'my_module' => [
    ['name' => 'my_module.view', 'display_name' => 'View'],
    ['name' => 'my_module.manage', 'display_name' => 'Manage'],
],
```

Then run: `php artisan db:seed --class=PermissionSeeder`

### Modify UI Colors

Change Tailwind classes in JSX files (using Tailwind color system)

### Add New Fields

1. Add migration for `roles` table if needed
2. Update model fillable
3. Update requests validation
4. Update controller/service
5. Update JSX forms

## Troubleshooting

### Routes Not Found
- Run: `php artisan route:cache --tags=admin`
- Check routes are in `routes/admin.php`
- Verify AdminLayout exists

### Permissions Not Working
- Run: `php artisan permission:cache-reset`
- Run seeder again
- Check database for permissions

### UI Not Rendering
- Run: `npm run build`
- Clear browser cache
- Check console for errors
- Verify AdminLayout imported in pages

### Database Errors
- Run migrations: `php artisan migrate`
- Run seeder: `php artisan db:seed`
- Check database connection

## File Locations Quick Reference

```
Role Management Module:
├── app/Http/Controllers/Admin/RoleController.php
├── app/Services/RoleService.php
├── app/Http/Requests/
│   ├── StoreRoleRequest.php
│   └── UpdateRoleRequest.php
├── resources/js/Layouts/AdminLayout.jsx
├── resources/js/Pages/Admin/Roles/
│   ├── Index.jsx
│   ├── Create.jsx
│   └── Edit.jsx
├── routes/admin.php (updated)
└── database/seeders/PermissionSeeder.php (updated)
```

## Next Steps

1. ✅ Run migrations
2. ✅ Seed permissions
3. ✅ Build assets
4. ✅ Test role creation
5. ✅ Assign roles to users
6. ✅ Test permissions in app
7. ✅ Customize as needed

## Support Resources

- **Documentation**: `ROLE_MODULE_DOCUMENTATION.md`
- **Spatie Laravel Permission**: https://spatie.be/docs/laravel-permission/
- **Inertia.js**: https://inertiajs.com/
- **Tailwind CSS**: https://tailwindcss.com/

---

**Module Version:** 1.0.0  
**Created:** May 11, 2026  
**Status:** Production Ready ✅
