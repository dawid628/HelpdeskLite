<?php

namespace App\Services;

use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Repositories\TicketRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

/**
 * Service handling ticket business logic
 */
readonly class TicketService
{
    /**
     * @param TicketRepository $ticketRepository
     */
    public function __construct(
        private TicketRepository $ticketRepository
    ) {}

    /**
     * Get all tickets with relationships
     *
     * @return Collection
     */
    public function getAllTickets(): Collection
    {
        return $this->ticketRepository->getAll();
    }

    /**
     * Create a new ticket with automatic reporter assignment
     *
     * @param array $data Ticket data
     * @return Ticket
     */
    public function createTicket(array $data): Ticket
    {
        $data['reporter_id'] = Auth::id();

        return $this->ticketRepository->create($data);
    }

    /**
     * Update ticket status and log the change
     *
     * @param int $ticketId Ticket ID
     * @param array $data Update data
     * @return Ticket
     */
    public function updateTicketStatus(int $ticketId, array $data): Ticket
    {
        $ticket = $this->ticketRepository->findOrFail($ticketId);

        $beforeStatus = $ticket->status;
        $afterStatus = StatusEnum::from($data['status']);

        $updatedTicket = $this->ticketRepository->update($ticket, [
            'status' => $afterStatus
        ]);

        // Save status change
        $this->ticketRepository->createStatusChange([
            'ticket_id' => $ticketId,
            'user_id' => Auth::id(),
            'before_status' => $beforeStatus,
            'after_status' => $afterStatus,
        ]);

        return $updatedTicket;
    }
}
