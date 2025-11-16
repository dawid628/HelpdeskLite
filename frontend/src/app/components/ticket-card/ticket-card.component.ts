import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import {
  StatusEnum,
  PriorityEnum,
  getStatusLabel,
  getStatusColor,
  getPriorityLabel,
  getPriorityColor
} from '../../models/enums';

/**
 * Ticket card component for displaying ticket summary
 */
@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule, PriorityBadgeComponent],
  templateUrl: './ticket-card.component.html',
  styleUrls: ['./ticket-card.component.css']
})
export class TicketCardComponent {
  @Input({ required: true }) ticket!: Ticket;
  @Input() loading: boolean = false;
  @Input() variant: 'default' | 'compact' | 'detailed' = 'default';

  getStatusLabel(status: StatusEnum): string {
    return getStatusLabel(status);
  }

  getStatusColor(status: StatusEnum): string {
    return getStatusColor(status);
  }

  getPriorityLabel(priority: PriorityEnum): string {
    return getPriorityLabel(priority);
  }

  getPriorityColor(priority: PriorityEnum): string {
    return getPriorityColor(priority);
  }

  truncateDescription(text: string, maxLength: number = 100): string {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
