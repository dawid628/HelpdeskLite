<?php

namespace Integration;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\TicketStatusChange;
use App\Models\User;
use App\Repositories\TicketRepository;
use App\Repositories\TicketStatusChangeRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TicketStatusChangeRepositoryIntegrationTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_status_change_for_ticket()
    {
        $reporter = User::factory()->create();
        $assignee = User::factory()->create();

        $ticket = Ticket::factory()->create([
            'title' => 'Ticket for status',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => []
        ]);

        $repository = new TicketStatusChangeRepository(new TicketStatusChange());

        $statusChange = $repository->createStatusChange([
            'ticket_id' => $ticket->id,
            'user_id' => $assignee->id,
            'before_status' => StatusEnum::OPEN,
            'after_status' => StatusEnum::CLOSED
        ]);

        $this->assertInstanceOf(TicketStatusChange::class, $statusChange);
        $this->assertEquals($ticket->id, $statusChange->ticket->id);
        $this->assertEquals($ticket->assignee_id, $statusChange->user->id);
        $this->assertEquals(StatusEnum::CLOSED, $statusChange->after_status);
        $this->assertEquals(StatusEnum::OPEN, $statusChange->before_status);
    }
}
