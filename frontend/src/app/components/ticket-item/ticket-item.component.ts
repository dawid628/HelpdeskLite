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
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private ticketService: TicketService,
    public authService: AuthService
  ) {}

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
   * Check if user can update ticket (admin or agent)
   */
  canUpdateTicket(): boolean {
    const user = this.authService.currentUser();
    if (!user || !user.role) return false;
    return user.role.name === 'admin' || user.role.name === 'agent';
  }

  /**
   * Check if user can delete ticket (admin only)
   */
  canDeleteTicket(): boolean {
    const user = this.authService.currentUser();
    if (!user || !user.role) return false;
    return user.role.name === 'admin';
  }

  /**
   * Change ticket status
   */
  changeStatus(newStatus: StatusEnum): void {
    if (!this.canUpdateTicket()) {
      alert('You do not have permission to update tickets');
      return;
    }

    this.ticketService.updateTicketStatus(this.ticket.id, { status: newStatus }).subscribe({
      error: (err) => {
        alert(err.error?.error || 'Failed to update ticket status');
      }
    });
  }

  /**
   * Delete ticket with confirmation
   */
  deleteTicket(): void {
    if (!this.canDeleteTicket()) {
      alert('You do not have permission to delete tickets');
      return;
    }

    if (confirm(`Are you sure you want to delete ticket "${this.ticket.title}"?`)) {
      this.ticketService.deleteTicket(this.ticket.id).subscribe({
        error: (err) => {
          alert(err.error?.error || 'Failed to delete ticket');
        }
      });
    }
  }
}
