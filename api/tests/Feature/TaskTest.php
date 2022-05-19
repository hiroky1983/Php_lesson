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
        $tasks= Task::factory()->count(10)->create();
        $response = $this->getJson('api/tasks');
        $response
        ->assertOk()
        ->assertJsonCount($tasks->count());
    }

    /**
     * @test
     */
    public function testCreateText()
    {
        $data = [
            'title' => 'test投稿'
        ];
        $response = $this->postJson('api/tasks', $data);
        $response->assertCreated()->assertJsonFragment($data);
    }
    
    /**
     * @test
     */
    public function testUpdateText()
    {
        $task = Task::factory()->create();
        
        $task->title = '書き換え';
        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray()); 
        $response->assertOk()->assertJsonFragment($task->toArray());
    }
     /**
     * @test
     */
    public function testDeleteText()
    {
        $task = Task::factory()->count(10)->create();

        $response = $this->deleteJson("api/tasks/1"); 
        $response->assertOk();

        $response = $this->getJson("api/tasks");
        $response->assertJsonCount($task->count() - 1);
    }
    
    /**
    * @test
    */
    public function nullableText()
    {
       $data = [
           'title' => ''
       ];
       $response = $this->postJson('api/tasks', $data);
       dd($response->json());
       $response->assertCreated()->assertJsonFragment($data);
    }
}
