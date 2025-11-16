<?php

namespace App\Repositories;

use App\Models\Ticket;
use App\Models\TicketStatusChange;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Repository handling database operations for tickets
 */
class TicketStatusChangeRepository
{
    private Model $model;

    public function __construct(TicketStatusChange $model)
    {
        $this->model = $model;
    }

    /**
     * Create ticket status change entry
     *
     * @param array $data Status change data
     * @return TicketStatusChange
     */
    public function createStatusChange(array $data): TicketStatusChange
    {
        return $this->model->create($data);
    }
}
