<?php

namespace App\Enums;

/**
 * Ticket status enumeration
 */
enum StatusEnum: int
{
    case OPEN = 1;
    case IN_PROGRESS = 2;
    case CLOSED = 3;

    /**
     * Get all enum values as an array
     *
     * @return array<int>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get human-readable label for the status
     *
     * @return string
     */
    public function label(): string
    {
        return match($this) {
            self::OPEN => 'Open',
            self::IN_PROGRESS => 'In Progress',
            self::CLOSED => 'Closed',
        };
    }
}
