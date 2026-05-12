<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

// admin routes
Route::middleware('auth')
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {

        require __DIR__ . '/admin.php';
    });


require __DIR__ . '/public.php';
