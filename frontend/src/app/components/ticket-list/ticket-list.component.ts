import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';
import {TicketFormComponent} from '../ticket-form/ticket-form.component';
import { StatusEnum, PriorityEnum } from '../../models/enums';

/**
 * Component displaying list of tickets with filters
 */
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, TicketItemComponent, TicketFormComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  // Public signals for template
  showForm = signal(false);
  filterStatus = signal<StatusEnum | null>(null);
  filterPriority = signal<PriorityEnum | null>(null);

  // Expose enums for template
  readonly StatusEnum = StatusEnum;
  readonly PriorityEnum = PriorityEnum;

  // Computed filtered tickets
  filteredTickets = computed(() => {
    let tickets = this.ticketService.tickets();

    const statusFilter = this.filterStatus();
    const priorityFilter = this.filterPriority();

    if (statusFilter !== null) {
      tickets = tickets.filter(t => t.status === statusFilter);
    }

    if (priorityFilter !== null) {
      tickets = tickets.filter(t => t.priority === priorityFilter);
    }

    return tickets;
  });

  constructor(public ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  /**
   * Load tickets from API
   */
  loadTickets(): void {
    this.ticketService.getTickets().subscribe();
  }

  /**
   * Toggle create form visibility
   */
  toggleForm(): void {
    this.showForm.update(v => !v);
  }

  /**
   * Handle form close event
   */
  onFormClose(): void {
    this.showForm.set(false);
  }

  /**
   * Set status filter
   */
  setStatusFilter(status: StatusEnum | null): void {
    this.filterStatus.set(status);
  }

  /**
   * Set priority filter
   */
  setPriorityFilter(priority: PriorityEnum | null): void {
    this.filterPriority.set(priority);
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.filterStatus.set(null);
    this.filterPriority.set(null);
  }
}
