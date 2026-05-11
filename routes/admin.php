<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Protected admin routes
Route::middleware('auth')->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard/Index');
    });
    
    // Add more admin routes here
});
