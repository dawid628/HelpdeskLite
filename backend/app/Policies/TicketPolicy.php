<?php

namespace App\Policies;

use App\Models\Ticket;
use App\Models\User;

/**
 * Policy for ticket authorization
 */
class TicketPolicy
{
    /**
     * Determine if user can view any tickets
     *
     * @param User $user
     * @return bool
     */
    public function viewAny(User $user): bool
    {
        return true; // Everyone can access the index
    }

    /**
     * Determine if user can view the ticket
     *
     * @param User $user
     * @param Ticket $ticket
     * @return bool
     */
    public function view(User $user, Ticket $ticket): bool
    {
        if ($user->isAdmin() || $user->isAgent()) {
            return true;
        }

        return $user->id === $ticket->reporter_id;
    }

    /**
     * Determine if user can create tickets
     *
     * @param User $user
     * @return bool
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine if user can update the ticket
     *
     * @param User $user
     * @param Ticket $ticket
     * @return bool
     */
    public function update(User $user, Ticket $ticket): bool
    {
        return $user->isAdmin() || $user->isAgent();
    }

    /**
     * Determine if user can delete the ticket
     *
     * @param User $user
     * @param Ticket $ticket
     * @return bool
     */
    public function delete(User $user, Ticket $ticket): bool
    {
        return $user->isAdmin();
    }
}
