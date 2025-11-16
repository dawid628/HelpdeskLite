import { User } from './user.model';
import { PriorityEnum, StatusEnum } from './enums';

export interface TicketStatusChange {
  id: number;
  ticket_id: number;
  user_id: number;
  before_status: StatusEnum;
  after_status: StatusEnum;
  created_at: string;
  updated_at: string;
  user?: User;
}

export interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: PriorityEnum;
  status: StatusEnum;
  assignee_id?: number | null;
  assignee?: User;
  reporter_id: number;
  reporter?: User;
  tags?: string[];
  created_at: string;
  updated_at: string;
  statusChanges?: TicketStatusChange[];
}

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: PriorityEnum;
  assignee_id?: number | null;
  tags?: string[];
}

export interface UpdateTicketStatusDto {
  status?: StatusEnum;
}

export interface ApiResponse<T> {
  data?: T;
  status?: string;
  message?: string;
}
