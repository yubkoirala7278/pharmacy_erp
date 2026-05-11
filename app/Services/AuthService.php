<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Authenticate a user with email and password.
     *
     * @param  string  $email
     * @param  string  $password
     * @param  bool  $remember
     * @return bool
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(string $email, string $password, bool $remember = false): bool
    {
        // Find user by email
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        // Authenticate the user
        Auth::login($user, $remember);

        return true;
    }

    /**
     * Get the authenticated user.
     *
     * @return \App\Models\User|null
     */
    public function getAuthenticatedUser(): ?User
    {
        return Auth::user();
    }

    /**
     * Check if user is authenticated.
     *
     * @return bool
     */
    public function isAuthenticated(): bool
    {
        return Auth::check();
    }

    /**
     * Logout the user.
     *
     * @return void
     */
    public function logout(): void
    {
        Auth::logout();
    }
}
