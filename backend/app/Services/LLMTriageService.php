<?php

namespace App\Services;

use App\DTOs\TriageSuggestionDto;
use App\Enums\PriorityEnum;
use App\Enums\StatusEnum;
use App\Models\Ticket;
use App\Models\Role;
use App\Models\User;

class LLMTriageService
{
    /**
     * Generate triage suggestion for a ticket
     *
     * @param Ticket $ticket
     * @return TriageSuggestionDto
     */
    public function suggestTriage(Ticket $ticket): TriageSuggestionDto
    {
        // Mock implementation - analyze ticket content
        $priority = $this->analyzePriority($ticket);
        $status = StatusEnum::OPEN;
        $assigneeId = $this->suggestAssignee($ticket);
        $tags = $this->suggestTags($ticket);
        $reasoning = $this->generateReasoning($ticket, $priority, $tags);

        return new TriageSuggestionDto(
            suggestedPriority: $priority->value,
            suggestedStatus: $status->value,
            suggestedAssigneeId: $assigneeId,
            suggestedTags: $tags,
            reasoning: $reasoning
        );
    }

    /**
     * Analyze ticket content and suggest priority
     *
     * @param Ticket $ticket
     * @return PriorityEnum
     */
    private function analyzePriority(Ticket $ticket): PriorityEnum
    {
        $content = strtolower($ticket->title . ' ' . $ticket->description);

        if (preg_match('/\b(critical|urgent|crash|down|outage|security|breach|data loss)\b/', $content)) {
            return PriorityEnum::CRITICAL;
        }

        if (preg_match('/\b(important|broken|error|bug|not working|failed|timeout)\b/', $content)) {
            return PriorityEnum::HIGH;
        }

        if (preg_match('/\b(feature|request|enhancement|suggestion|nice to have|cosmetic)\b/', $content)) {
            return PriorityEnum::LOW;
        }

        return PriorityEnum::MEDIUM;
    }

    /**
     * Suggest assignee based on ticket content
     *
     * @param Ticket $ticket
     * @return int|null
     */
    private function suggestAssignee(Ticket $ticket): ?int
    {
        $agentRole = Role::where('name', 'agent')->first();

        if (!$agentRole) {
            return null;
        }

        $agent = User::where('role_id', $agentRole->id)->inRandomOrder()->first();

        return $agent?->id;
    }

    /**
     * Suggest tags based on ticket content
     *
     * @param Ticket $ticket
     * @return array
     */
    private function suggestTags(Ticket $ticket): array
    {
        $content = strtolower($ticket->title . ' ' . $ticket->description);
        $tags = [];

        $tagMappings = [
            'bug' => ['bug', 'error', 'broken', 'not working', 'crash'],
            'feature' => ['feature', 'enhancement', 'request', 'add', 'new'],
            'ui' => ['ui', 'interface', 'design', 'layout', 'appearance'],
            'performance' => ['slow', 'performance', 'speed', 'timeout', 'lag'],
            'security' => ['security', 'vulnerability', 'breach', 'hack', 'password'],
            'database' => ['database', 'sql', 'data', 'query'],
            'authentication' => ['login', 'logout', 'auth', 'signin', 'password'],
            'mobile' => ['mobile', 'ios', 'android', 'phone', 'tablet'],
            'api' => ['api', 'endpoint', 'integration', 'rest'],
        ];

        foreach ($tagMappings as $tag => $keywords) {
            foreach ($keywords as $keyword) {
                if (strpos($content, $keyword) !== false) {
                    $tags[] = $tag;
                    break;
                }
            }
        }

        return array_unique($tags);
    }

    /**
     * Generate reasoning for the suggestions
     *
     * @param Ticket $ticket
     * @param PriorityEnum $priority
     * @param array $tags
     * @return string
     */
    private function generateReasoning(Ticket $ticket, PriorityEnum $priority, array $tags): string
    {
        $reasons = [];

        $reasons[] = match($priority) {
            PriorityEnum::CRITICAL => "Set as CRITICAL due to keywords indicating system-wide impact or security concerns.",
            PriorityEnum::HIGH => "Set as HIGH priority because the issue appears to be blocking normal operations.",
            PriorityEnum::MEDIUM => "Set as MEDIUM priority - standard issue that should be addressed in normal workflow.",
            PriorityEnum::LOW => "Set as LOW priority - appears to be a feature request or minor enhancement.",
        };

        if (!empty($tags)) {
            $reasons[] = "Suggested tags: " . implode(', ', $tags) . " based on content analysis.";
        }

        $reasons[] = "Assigned to available agent for review.";

        return implode(' ', $reasons);
    }
}
