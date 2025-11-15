<?php

namespace App\DTOs;

class TriageSuggestionDto
{
    public function __construct(
        public readonly int $suggestedPriority,
        public readonly int $suggestedStatus,
        public readonly ?int $suggestedAssigneeId,
        public readonly array $suggestedTags,
        public readonly string $reasoning
    ) {}

    public function toArray(): array
    {
        return [
            'suggested_priority' => $this->suggestedPriority,
            'suggested_status' => $this->suggestedStatus,
            'suggested_asigneeId' => $this->suggestedAssigneeId,
            'suggested_tags' => $this->suggestedTags,
            'reasoning' => $this->reasoning,
        ];
    }
}
