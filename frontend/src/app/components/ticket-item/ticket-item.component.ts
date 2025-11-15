import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../models/ticket.model';
import {
  StatusEnum,
  PriorityEnum,
  getStatusLabel,
  getStatusColor,
  getPriorityLabel,
  getPriorityColor
} from '../../models/enums';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';

/**
 * Component displaying single ticket card
 */
@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent {
  @Input({ required: true }) ticket!: Ticket;

  // Expose enums for template
  protected readonly StatusEnum = StatusEnum;
  protected readonly PriorityEnum = PriorityEnum;

  // Current status model
  currentStatus: StatusEnum = StatusEnum.OPEN;

  constructor(
    private ticketService: TicketService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentStatus = this.ticket.status;
  }

  /**
   * Get status label
   */
  getStatusLabel(status: StatusEnum): string {
    return getStatusLabel(status);
  }

  /**
   * Get status color
   */
  getStatusColor(status: StatusEnum): string {
    return getStatusColor(status);
  }

  /**
   * Get priority label
   */
  getPriorityLabel(priority: PriorityEnum): string {
    return getPriorityLabel(priority);
  }

  /**
   * Get priority color
   */
  getPriorityColor(priority: PriorityEnum): string {
    return getPriorityColor(priority);
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
   * Handle status change
   */
  onStatusChange(): void {
    if (!this.canUpdateTicket()) {
      alert('You do not have permission to update tickets');
      this.currentStatus = this.ticket.status; // Reset to original
      return;
    }

    this.ticketService.updateTicketStatus(this.ticket.id, { status: this.currentStatus }).subscribe({
      next: () => {
        // Update successful
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to update ticket status');
        this.currentStatus = this.ticket.status; // Reset to original
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
