<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('users')->insert([
            [
                'name' => 'admin',
                'email' => 'admin@exsample.com',
                'email_verified_at' => now(),
                'password' => \Hash::make('123456789'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'yamada',
                'email' => 'yamada@exsample.com',
                'email_verified_at' => now(),
                'password' => \Hash::make('123456789'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'tanaka',
                'email' => 'tanaka@exsample.com',
                'email_verified_at' => now(),
                'password' => \Hash::make('123456789'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
