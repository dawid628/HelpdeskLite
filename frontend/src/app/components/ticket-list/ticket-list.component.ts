import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { HeaderComponent } from '../header/header.component';
import { StatusEnum, PriorityEnum } from '../../models/enums';

/**
 * Component displaying list of tickets with filters
 */
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, TicketItemComponent, TicketFormComponent, HeaderComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  showForm = signal(false);
  filterStatus = signal<StatusEnum | null>(null);
  filterPriority = signal<PriorityEnum | null>(null);

  // Expose enums for template
  readonly StatusEnum = StatusEnum;
  readonly PriorityEnum = PriorityEnum;

  constructor(public ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  /**
   * Load tickets from API with current filters
   */
  loadTickets(): void {
    const filters: any = {};

    if (this.filterStatus() !== null) {
      filters.status = this.filterStatus();
    }

    if (this.filterPriority() !== null) {
      filters.priority = this.filterPriority();
    }

    this.ticketService.getTickets(filters).subscribe();
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
    this.loadTickets();
  }

  /**
   * Set status filter and reload tickets
   */
  setStatusFilter(status: StatusEnum | null): void {
    this.filterStatus.set(status);
    this.loadTickets();
  }

  /**
   * Set priority filter and reload tickets
   */
  setPriorityFilter(priority: PriorityEnum | null): void {
    this.filterPriority.set(priority);
    this.loadTickets();
  }

  /**
   * Clear all filters and reload tickets
   */
  clearFilters(): void {
    this.filterStatus.set(null);
    this.filterPriority.set(null);
    this.loadTickets();
  }

  /**
   * Get tickets
   */
  get tickets() {
    return this.ticketService.tickets();
  }
}
