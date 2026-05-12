<?php

use App\Http\Controllers\Admin\RoleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard/Index');
})->name('dashboard');

// Role Management
Route::resource('roles', RoleController::class)->except(['show']);
