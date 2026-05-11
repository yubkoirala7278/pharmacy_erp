<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home route - redirect based on auth status
Route::get('/', function () {
    if (auth()->check()) {
        return redirect('/dashboard');
    }
    return redirect('/login');
});

// Protected dashboard route
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Home', ['name' => auth()->user()->name]);
    })->name('dashboard');
});
