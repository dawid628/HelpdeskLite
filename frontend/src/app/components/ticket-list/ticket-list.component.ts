import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import {UserService} from '../../services/user.service';
import { TicketItemComponent } from '../ticket-item/ticket-item.component';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../../services/auth.service';
import { StatusEnum, PriorityEnum } from '../../models/enums';
import { User } from '../../models/user.model';
import { WeatherBannerComponent } from '../weather-banner/weather-banner.component';

/**
 * Component displaying list of tickets with filters
 */
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketItemComponent, TicketFormComponent, HeaderComponent, WeatherBannerComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  showForm = signal(false);
  filterStatus = signal<StatusEnum | null>(null);
  filterPriority = signal<PriorityEnum | null>(null);
  filterAssignee = signal<number | string | null>(null);
  filterTags = signal<string>(''); // Changed to string for input

  // Expose enums for template
  readonly StatusEnum = StatusEnum;
  readonly PriorityEnum = PriorityEnum;

  // Available data for filters
  availableUsers = signal<User[]>([]);
  availableTags = signal<string[]>([]);

  constructor(
    public ticketService: TicketService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.currentUser()) {
      this.authService.me().subscribe({
        next: () => {
          this.loadTickets();
          this.loadFilterData();
        },
        error: () => {
        }
      });
    } else {
      this.loadTickets();
      this.loadFilterData();
    }
  }

  /**
   * Load filter data (users and tags)
   */
  loadFilterData(): void {
    // Load users for assignee filter
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.availableUsers.set(response.data || []);
      },
      error: () => {
        console.error('Failed to load users');
      }
    });
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

    if (this.filterAssignee() !== null) {
      filters.assignee_id = this.filterAssignee();
    }

    // Parse tags from comma-separated input
    if (this.filterTags().trim() !== '') {
      const tags = this.filterTags()
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      if (tags.length > 0) {
        filters.tags = tags;
      }
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
    this.loadFilterData(); // Refresh tags after creating ticket
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
   * Set assignee filter and reload tickets
   */
  setAssigneeFilter(assigneeId: number | string | null): void {
    this.filterAssignee.set(assigneeId);
    this.loadTickets();
  }

  /**
   * Handle tags input change
   */
  onTagsInput(): void {
    this.loadTickets();
  }

  /**
   * Clear all filters and reload tickets
   */
  clearFilters(): void {
    this.filterStatus.set(null);
    this.filterPriority.set(null);
    this.filterAssignee.set(null);
    this.filterTags.set('');
    this.loadTickets();
  }

  /**
   * Check if any filter is active
   */
  hasActiveFilters(): boolean {
    return this.filterStatus() !== null ||
      this.filterPriority() !== null ||
      this.filterAssignee() !== null ||
      this.filterTags().trim() !== '';
  }

  /**
   * Get tickets
   */
  get tickets() {
    return this.ticketService.tickets();
  }
}
