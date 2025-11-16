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

class TicketRepositoryFindOrFailTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_finds_ticket_or_fails(): void
    {
        $repository = new TicketRepository(new Ticket());

        $reporter = User::factory()->create();
        $assignee = User::factory()->create();

        $ticket = Ticket::create([
            'title' => 'Unit Test Ticket',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['bug', 'idk'],
        ]);

        $gotTicket = $repository->findOrFail($ticket->id);

        $this->assertInstanceOf(Ticket::class, $gotTicket);
        $this->assertEquals($gotTicket->id, $ticket->id);

        $this->expectException(ModelNotFoundException::class);
        $repository->findOrFail(999999);
    }
}
