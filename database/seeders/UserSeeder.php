<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create super admin user
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@pharmacy.local'],
            [
                'name' => 'Admin Khan',
                'password' => Hash::make('password'),
            ]
        );

        // Assign super-admin role
        $superAdmin->assignRole('super-admin');
    }
}
