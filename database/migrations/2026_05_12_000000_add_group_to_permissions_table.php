<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $tableNames = config('permission.table_names');

        throw_if(empty($tableNames), 'Error: config/permission.php not loaded. Run [php artisan config:clear] and try again.');

        Schema::table($tableNames['permissions'], static function (Blueprint $table) {
            if (!Schema::hasColumn($table->getTable(), 'group_name')) {
                $table->string('group_name')->nullable()->after('name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('permission.table_names');

        throw_if(empty($tableNames), 'Error: config/permission.php not loaded. Run [php artisan config:clear] and try again.');

        Schema::table($tableNames['permissions'], static function (Blueprint $table) {
            if (Schema::hasColumn($table->getTable(), 'group_name')) {
                $table->dropColumn('group_name');
            }
        });
    }
};
