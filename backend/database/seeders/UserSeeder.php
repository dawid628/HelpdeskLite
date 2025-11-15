<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminRole = Role::where('name', 'admin')->first();
        $agentRole = Role::where('name', 'agent')->first();
        $reporterRole = Role::where('name', 'reporter')->first();

        User::firstOrCreate(
            ['email' => 'admin@admin.pl'],
            ['name' => 'Admin user',
                'password' => Hash::make('password'),
                'role_id' => $adminRole->id]
        );

        User::firstOrCreate(
            ['email' => 'agent@admin.pl'],
            ['name' => 'Agent user',
                'password' => Hash::make('password'),
                'role_id' => $agentRole->id]
        );

        User::firstOrCreate(
            ['email' => 'reporter@admin.pl'],
            ['name' => 'Reported user',
                'password' => Hash::make('password'),
                'role_id' => $reporterRole->id]
        );
    }
}
