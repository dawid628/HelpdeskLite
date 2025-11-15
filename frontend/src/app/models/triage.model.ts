import { PriorityEnum, StatusEnum } from './enums';

/**
 * Triage suggestion interface
 */
export interface TriageSuggestion {
  suggested_priority: PriorityEnum;
  suggested_status: StatusEnum;
  suggested_assignee_id: number | null;
  suggested_tags: string[];
  reasoning: string;
}

/**
 * API response for triage suggestion
 */
export interface TriageSuggestionResponse {
  status: string;
  data: TriageSuggestion;
}
