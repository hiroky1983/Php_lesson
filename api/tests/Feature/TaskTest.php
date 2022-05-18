<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     */
    public function testBasicTest()
    {
        $tasks= task::factory()->count(10)->create();

        $response = $this->getJson('api/tasks');
        dd($response->json());
        
        $response
        ->assertOk()
        ->assertJsonCount($tasks->count());
    }
}
