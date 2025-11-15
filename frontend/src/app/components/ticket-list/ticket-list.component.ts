import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../services/ticket.service';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { StatusEnum, PriorityEnum } from '../../models/enums';

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

  readonly StatusEnum = StatusEnum;
  readonly PriorityEnum = PriorityEnum;

  constructor(
    public ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Jeśli nie mamy użytkownika, pobierz
    if (!this.authService.currentUser()) {
      this.authService.me().subscribe({
        next: () => this.loadTickets(),
        error: () => {} // Interceptor obsłuży
      });
    } else {
      this.loadTickets();
    }
  }

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

  toggleForm(): void {
    this.showForm.update(v => !v);
  }

  onFormClose(): void {
    this.showForm.set(false);
    this.loadTickets();
  }

  setStatusFilter(status: StatusEnum | null): void {
    this.filterStatus.set(status);
    this.loadTickets();
  }

  setPriorityFilter(priority: PriorityEnum | null): void {
    this.filterPriority.set(priority);
    this.loadTickets();
  }

  clearFilters(): void {
    this.filterStatus.set(null);
    this.filterPriority.set(null);
    this.loadTickets();
  }

  get tickets() {
    return this.ticketService.tickets();
  }
}
