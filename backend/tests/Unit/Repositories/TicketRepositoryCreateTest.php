<?php

namespace Tests\Unit\Repositories;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\User;
use App\Repositories\TicketRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TicketRepositoryCreateTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_a_ticket(): void
    {
        $repository = new TicketRepository(new Ticket());

        $reporter = User::factory()->create();
        $assignee = User::factory()->create();

        $ticketData = [
            'title' => 'Unit Test Ticket',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['bug', 'idk'],
        ];

        $ticket = $repository->create($ticketData);

        $this->assertInstanceOf(Ticket::class, $ticket);
        $this->assertEquals('Unit Test Ticket', $ticket->title);
        $this->assertEquals(['bug', 'idk'], $ticket->tags);
        $this->assertDatabaseHas('tickets', ['title' => 'Unit Test Ticket']);
    }
}
