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
        
        Schema::table($tableNames['roles'], static function (Blueprint $table) {
            if (!Schema::hasColumn($table->getTable(), 'display_name')) {
                $table->string('display_name')->nullable()->after('name');
            }
            if (!Schema::hasColumn($table->getTable(), 'description')) {
                $table->text('description')->nullable()->after('display_name');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('permission.table_names');
        
        Schema::table($tableNames['roles'], static function (Blueprint $table) {
            if (Schema::hasColumn($table->getTable(), 'display_name')) {
                $table->dropColumn('display_name');
            }
            if (Schema::hasColumn($table->getTable(), 'description')) {
                $table->dropColumn('description');
            }
        });
    }
};
