<?php

namespace App\Services;

use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Repositories\TicketRepository;
use Illuminate\Auth\Access\AuthorizationException;
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
     * Get all tickets with relationships based on user role
     *
     * @param array $filters Optional filters
     * @return Collection
     */
    public function getAllTickets(array $filters = []): Collection
    {
        $user = Auth::user();
        return $this->ticketRepository->getAll($user, $filters);
    }

    /**
     * Get single ticket
     *
     * @param int $ticketId Ticket ID
     * @return Ticket
     * @throws AuthorizationException
     */
    public function getTicket(int $ticketId): Ticket
    {
        $ticket = $this->ticketRepository->findOrFail($ticketId);

        if (Auth::user() && !Auth::user()->can('view', $ticket)) {
            throw new AuthorizationException('You are not authorized to view this ticket');
        }

        return $ticket;
    }

    /**
     * Create a new ticket
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
     * Update ticket (can update status, priority, assignee, tags)
     *
     * @param int $ticketId Ticket ID
     * @param array $data Update data
     * @return Ticket
     * @throws AuthorizationException
     */
    public function updateTicket(int $ticketId, array $data): Ticket
    {
        $ticket = $this->ticketRepository->findOrFail($ticketId);

        // Check authorization
        if (Auth::user() && !Auth::user()->can('update', $ticket)) {
            throw new AuthorizationException('You are not authorized to update this ticket');
        }

        // Log status change if status is being updated
        if (isset($data['status'])) {
            $beforeStatus = $ticket->status;
            $afterStatus = StatusEnum::from($data['status']);

            if ($beforeStatus !== $afterStatus) {
                $this->ticketRepository->createStatusChange([
                    'ticket_id' => $ticketId,
                    'user_id' => Auth::id(),
                    'before_status' => $beforeStatus,
                    'after_status' => $afterStatus,
                ]);
            }
        }

        return $this->ticketRepository->update($ticket, $data);
    }

    /**
     * Update ticket status (legacy method, kept for backwards compatibility)
     *
     * @param int $ticketId Ticket ID
     * @param array $data Update data
     * @return Ticket
     * @throws AuthorizationException
     */
    public function updateTicketStatus(int $ticketId, array $data): Ticket
    {
        return $this->updateTicket($ticketId, $data);
    }

    /**
     * Delete ticket
     *
     * @param int $ticketId Ticket ID
     * @return bool
     * @throws AuthorizationException
     */
    public function deleteTicket(int $ticketId): bool
    {
        $ticket = $this->ticketRepository->findOrFail($ticketId);

        if (Auth::user() && !Auth::user()->can('delete', $ticket)) {
            throw new AuthorizationException('You are not authorized to delete this ticket');
        }

        return $this->ticketRepository->delete($ticket);
    }
}
