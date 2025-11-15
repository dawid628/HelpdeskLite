<?php

namespace App\Models;

use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'assignee_id',
        'reporter_id',
        'tags',
    ];

    protected $casts = [
        'priority' => PriorityEnum::class,
        'status' => StatusEnum::class,
        'tags' => 'array',
    ];

    /**
     * Get the user assigned to this ticket.
     *
     * @return BelongsTo
     */
    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    /**
     * Get the user who reported this ticket.
     *
     * @return BelongsTo
     */
    public function reporter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    /**
     * Get all status changes for this ticket.
     *
     * @return HasMany
     */
    public function statusChanges(): HasMany
    {
        return $this->hasMany(TicketStatusChange::class);
    }
}
