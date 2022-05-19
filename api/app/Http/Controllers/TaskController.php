<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Http\Requests\TaskRequest;

class TaskController extends Controller
{
    /**
     * Task一覧
     *
     * @return \Illuminate\Support\Collection
     */

    public function index()
    {
        return Task::orderByDesc('id')->get();
    }

    /**
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreTaskRequest $request)
    {
        $task = Task::create($request->all());

        return $task ? 
        response()->json($task, 201) 
        : response()->json([], 500);
    }

    /**
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTaskRequest  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->title = $request->title;

        return $task->update() ? response()->json($task) : response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Task $task)
    {
        return $task->delete() ? response()->json($task) : response()->json([], 500);

    }
}
