import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../models/ticket.model';
import {TriageSuggestion} from '../../models/triage.model';
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
import { TriageSuggestionPanelComponent } from '../triage-suggestion-panel/triage-suggestion-panel.component';

/**
 * Component displaying single ticket card
 */
@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [CommonModule, FormsModule, TriageSuggestionPanelComponent],
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.css']
})
export class TicketItemComponent implements OnInit {
  @Input({ required: true }) ticket!: Ticket;

  protected readonly StatusEnum = StatusEnum;
  protected readonly PriorityEnum = PriorityEnum;

  currentStatus: StatusEnum = StatusEnum.OPEN;

  showTriage = false;
  triageSuggestion: TriageSuggestion | null = null;
  triageLoading = false;
  triageError: string | null = null;

  constructor(
    private ticketService: TicketService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentStatus = this.ticket.status;
  }

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

  canUpdateTicket(): boolean {
    const user = this.authService.currentUser();
    if (!user || !user.role) return false;
    return user.role.name === 'admin' || user.role.name === 'agent';
  }

  canDeleteTicket(): boolean {
    const user = this.authService.currentUser();
    if (!user || !user.role) return false;
    return user.role.name === 'admin';
  }

  /**
   * Can use triage assistant (agents and admins)
   */
  canUseTriage(): boolean {
    return this.canUpdateTicket();
  }

  onStatusChange(): void {
    if (!this.canUpdateTicket()) {
      alert('You do not have permission to update tickets');
      this.currentStatus = this.ticket.status;
      return;
    }

    this.ticketService.updateTicketStatus(this.ticket.id, { status: this.currentStatus }).subscribe({
      next: () => {},
      error: (err) => {
        alert(err.error?.error || 'Failed to update ticket status');
        this.currentStatus = this.ticket.status;
      }
    });
  }

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

  /**
   * Request AI triage suggestion
   */
  requestTriage(): void {
    this.showTriage = true;
    this.triageLoading = true;
    this.triageError = null;
    this.triageSuggestion = null;

    this.ticketService.getTriageSuggestion(this.ticket.id).subscribe({
      next: (response) => {
        this.triageSuggestion = response.data;
        this.triageLoading = false;
      },
      error: (err) => {
        this.triageError = err.error?.error || 'Failed to get triage suggestion';
        this.triageLoading = false;
      }
    });
  }

  /**
   * Accept triage suggestion
   */
  acceptTriage(suggestion: TriageSuggestion): void {
    this.ticketService.applyTriageSuggestion(this.ticket.id, suggestion).subscribe({
      next: () => {
        this.showTriage = false;
        this.triageSuggestion = null;
        // Reload tickets to see updated data
        window.location.reload();
      },
      error: (err) => {
        alert(err.error?.error || 'Failed to apply triage suggestion');
      }
    });
  }

  /**
   * Reject triage suggestion
   */
  rejectTriage(): void {
    this.showTriage = false;
    this.triageSuggestion = null;
  }

  /**
   * Close triage panel
   */
  closeTriage(): void {
    this.showTriage = false;
    this.triageSuggestion = null;
    this.triageError = null;
  }
}
