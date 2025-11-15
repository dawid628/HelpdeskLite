<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TicketStatusChange extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id',
        'user_id',
        'before_status',
        'after_status',
    ];

    protected $casts = [
        'before_status' => StatusEnum::class,
        'after_status' => StatusEnum::class,
    ];

    /**
     * Related ticket
     *
     * @return BelongsTo
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class);
    }

    /**
     * Related user
     *
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
