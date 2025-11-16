<?php

namespace Tests\Feature\Integration;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\User;
use App\Repositories\TicketRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class TicketRepositoryIntegrationTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_creates_and_fetches_ticket_with_relations()
    {
        $repository = new TicketRepository(new Ticket());

        $reporter = User::factory()->create();
        $assignee = User::factory()->create();

        $ticket = $repository->create([
            'title' => 'Integration Test Ticket',
            'description' => 'Something went wrong',
            'status' => StatusEnum::OPEN,
            'priority' => PriorityEnum::CRITICAL,
            'reporter_id' => $reporter->id,
            'assignee_id' => $assignee->id,
            'tags' => ['bug', 'idk'],
        ]);

        $found = $repository->findOrFail($ticket->id);

        $this->assertEquals($reporter->id, $found->reporter->id);
        $this->assertEquals($assignee->id, $found->assignee->id);
        $this->assertSame(['bug', 'idk'], $found->tags);
        $this->assertEquals('Integration Test Ticket', $found->title);
    }
}
