<?php

namespace App\Repositories;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Repository handling database operations for tickets
 */
class TicketRepository
{
    private Model $model;

    public function __construct(Ticket $model)
    {
        $this->model = $model;
    }

    /**
     * Get all tickets with relationships
     *
     * @param User|null $user Current authenticated user
     * @param array $filters Optional filters
     * @return Collection
     */
    public function getAll(?User $user = null, array $filters = []): Collection
    {
        $query = $this->model->with(['assignee.role', 'reporter.role', 'statusChanges.user']);

        if ($user && $user->isReporter()) {
            $query->where('reporter_id', $user->id);
        }

        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (isset($filters['priority'])) {
            $query->where('priority', $filters['priority']);
        }

        if (isset($filters['assignee_id'])) {
            $query->where('assignee_id', $filters['assignee_id']);
        }

        if (isset($filters['reporter_id'])) {
            $query->where('reporter_id', $filters['reporter_id']);
        }

        if (isset($filters['tags']) && is_array($filters['tags'])) {
            foreach ($filters['tags'] as $tag) {
                $query->whereJsonContains('tags', $tag);
            }
        }

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
        return $this->model->with(['assignee.role', 'reporter.role', 'statusChanges.user'])
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
        return $this->model->create($data);
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

        return $ticket->fresh(['assignee.role', 'reporter.role', 'statusChanges.user']);
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
     * Get all unique tags from all tickets
     *
     * @return array
     */
    public function getAllTags(): array
    {
        $tickets = $this->model->whereNotNull('tags')->get();
        $allTags = [];

        foreach ($tickets as $ticket)
        {
            if(is_array($ticket->tags)) {
                $allTags = array_merge($allTags, $ticket->tags);
            }
        }

        return array_values(array_unique($allTags));
    }
}
