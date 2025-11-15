import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { CreateTicketDto } from '../../models/ticket.model';
import { PriorityEnum, getPriorityLabel } from '../../models/enums';

/**
 * Component for creating new tickets
 */
@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {
  @Output() close = new EventEmitter<void>();

  // Form fields
  protected title = signal('');
  protected description = signal('');
  protected priority = signal<PriorityEnum>(PriorityEnum.MEDIUM);
  protected assigneeId = signal<number>(1);
  protected tags = signal<string>('');

  // Expose enum for template
  protected readonly PriorityEnum = PriorityEnum;
  protected readonly priorities = [
    PriorityEnum.LOW,
    PriorityEnum.MEDIUM,
    PriorityEnum.HIGH,
    PriorityEnum.CRITICAL
  ];

  constructor(private ticketService: TicketService) {}

  /**
   * Get priority label
   */
  getPriorityLabel(priority: PriorityEnum): string {
    return getPriorityLabel(priority);
  }

  /**
   * Submit form
   */
  onSubmit(): void {
    if (!this.title() || !this.description()) {
      alert('Please fill in all required fields');
      return;
    }

    const ticketData: CreateTicketDto = {
      title: this.title(),
      description: this.description(),
      priority: this.priority(),
      assignee_id: this.assigneeId(),
      tags: this.tags() ? this.tags().split(',').map(t => t.trim()).filter(t => t) : []
    };

    this.ticketService.createTicket(ticketData).subscribe({
      next: () => {
        this.resetForm();
        this.close.emit();
      },
      error: (err) => {
        console.error('Error creating ticket:', err);
        alert('Failed to create ticket. Please try again.');
      }
    });
  }

  /**
   * Reset form fields
   */
  resetForm(): void {
    this.title.set('');
    this.description.set('');
    this.priority.set(PriorityEnum.MEDIUM);
    this.assigneeId.set(1);
    this.tags.set('');
  }

  /**
   * Cancel and close form
   */
  onCancel(): void {
    this.resetForm();
    this.close.emit();
  }
}
