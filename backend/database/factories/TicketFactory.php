<?php

namespace Database\Factories;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
  protected $model = Ticket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reporter = User::factory()->create();
        $assignee = User::factory()->create();

        return [
            'title' => $this->faker->paragraph(),
            'description' => $this->faker->sentence(),
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['test']
        ];
    }
}
