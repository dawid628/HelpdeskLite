import { PriorityEnum, StatusEnum } from './enums';
import { User } from './user.model';

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
  assignee_id: number;
  reporter_id: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  assignee?: User;
  reporter?: User;
  statusChanges?: TicketStatusChange[];
}

export interface CreateTicketDto {
  title: string;
  description: string;
  priority: PriorityEnum;
  assignee_id: number;
  tags?: string[];
}

export interface UpdateTicketStatusDto {
  status: StatusEnum;
}

export interface ApiResponse<T> {
  data?: T;
  status?: string;
  message?: string;
}
