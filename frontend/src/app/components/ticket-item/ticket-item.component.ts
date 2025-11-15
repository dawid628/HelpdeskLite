import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket.model';
import {
  StatusEnum,
  PriorityEnum,
  getStatusLabel,
  getPriorityLabel,
} from '../../models/enums';
import { TicketService } from '../../services/ticket.service';

/**
 * Component displaying single ticket card
 */
@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent {
  @Input({ required: true }) ticket!: Ticket;

  // Expose enums for template
  protected readonly StatusEnum = StatusEnum;
  protected readonly PriorityEnum = PriorityEnum;

  constructor(private ticketService: TicketService) {}

  /**
   * Get status label
   */
  getStatusLabel(status: StatusEnum): string {
    return getStatusLabel(status);
  }

  /**
   * Get priority label
   */
  getPriorityLabel(priority: PriorityEnum): string {
    return getPriorityLabel(priority);
  }

  /**
   * Change ticket status
   */
  changeStatus(newStatus: StatusEnum): void {
    this.ticketService.updateTicketStatus(this.ticket.id, { status: newStatus }).subscribe();
  }

  /**
   * Delete ticket with confirmation
   */
  deleteTicket(): void {
    if (confirm(`Are you sure you want to delete ticket "${this.ticket.title}"?`)) {
      this.ticketService.deleteTicket(this.ticket.id).subscribe();
    }
  }
}
