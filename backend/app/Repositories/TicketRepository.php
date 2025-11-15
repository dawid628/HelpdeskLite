<?php

namespace App\Repositories;

use App\Models\Ticket;
use App\Models\TicketStatusChange;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Repository handling database operations for tickets
 */
class TicketRepository
{
    /**
     * Get all tickets with relationships
     *
     * @param array $filters
     * @return Collection
     */
    public function getAll(array $filters = []): Collection
    {
        $query = Ticket::with(['assignee', 'reporter', 'statusChanges']);
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (isset($filters['assignee_id'])) {
            $query->where('assignee_id', $filters['assignee_id']);
        }

        if (isset($filters['tags']) && is_array($filters['tags'])) {
            foreach ($filters['tags'] as $tag) {
                $query->whereJsonContains('tags', $tag);
            }
        }

        // dla konkretnego zglaszajacego
//        if(isset($filters['reporter_id'])) {
//
//        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Find ticket by ID or throw exception
     *
     * @param int $id Ticket ID
     * @return Ticket
     * @throws ModelNotFoundException
     */
    public function findOrFail(int $id): Ticket
    {
        return Ticket::with(['assignee', 'reporter', 'statusChanges.user'])
            ->findOrFail($id);
    }

    /**
     * Create a new ticket
     *
     * @param array $data Ticket data
     * @return Ticket
     */
    public function create(array $data): Ticket
    {
        return Ticket::create($data);
    }

    /**
     * Update ticket and return refreshed instance
     *
     * @param Ticket $ticket Ticket instance
     * @param array $data Update data
     * @return Ticket
     */
    public function update(Ticket $ticket, array $data): Ticket
    {
        $ticket->update($data);

        return $ticket->fresh(['assignee', 'reporter', 'statusChanges.user']);
    }

    /**
     * Delete ticket
     *
     * @param Ticket $ticket Ticket instance
     * @return bool
     */
    public function delete(Ticket $ticket): bool
    {
        return $ticket->delete();
    }

    /**
     * Create ticket status change entry
     *
     * @param array $data Status change data
     * @return TicketStatusChange
     */
    public function createStatusChange(array $data): TicketStatusChange
    {
        return TicketStatusChange::create($data);
    }
}
