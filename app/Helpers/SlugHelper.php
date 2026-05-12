<?php

namespace App\Helpers;

class SlugHelper
{
    /**
     * Generate a cryptographically secure random alphanumeric slug.
     */
    public static function generate(int $length = 16): string
    {
        $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $slug = '';

        for ($i = 0; $i < $length; $i++) {
            $slug .= $characters[random_int(0, strlen($characters) - 1)];
        }

        return $slug;
    }
}
