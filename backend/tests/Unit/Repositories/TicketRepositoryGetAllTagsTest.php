<?php

namespace Tests\Unit\Repositories;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\User;
use App\Repositories\TicketRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TicketRepositoryGetAllTagsTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_returns_all_unique_tags(): void
    {
        $repository = new TicketRepository();

        $reporter = User::factory()->create();
        $assignee = User::factory()->create();

        Ticket::create([
            'title' => 'Unit Test Ticket 1',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['bug', 'idk', 'technical'],
        ]);

        Ticket::create([
            'title' => 'Unit Test Ticket 2',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['bug', 'mobile', 'urgent'],
        ]);

        Ticket::create([
            'title' => 'Unit Test Ticket 3',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['test', 'desk'],
        ]);

        $tags = $repository->getAllTags();

        $this->assertIsArray($tags);
        $this->assertCount(7, $tags);
        $this->assertContains('test', $tags);
        $this->assertContains('desk', $tags);
        $this->assertContains('bug', $tags);
        $this->assertContains('urgent', $tags);
        $this->assertContains('idk', $tags);
        $this->assertContains('technical', $tags);
        $this->assertContains('mobile', $tags);
    }
}
