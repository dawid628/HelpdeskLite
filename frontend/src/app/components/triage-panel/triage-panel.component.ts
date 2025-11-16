import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityBadgeComponent } from '../priority-badge/priority-badge.component';
import { getPriorityLabel, getStatusLabel, getPriorityColor, getStatusColor } from '../../models/enums';

/**
 * Triage suggestion panel component
 */
@Component({
  selector: 'app-triage-panel',
  standalone: true,
  imports: [CommonModule, PriorityBadgeComponent],
  templateUrl: './triage-panel.component.html',
  styleUrls: ['./triage-panel.component.css']
})
export class TriagePanelComponent {
  @Input() suggestedPriority: number | null = 2;
  @Input() suggestedStatus: number | null = 0;
  @Input() suggestedTags: string[] = [];
  @Input() reasoning: string = '';
  @Input() loading: boolean = false;
  @Input() error: string | null = null;

  @Output() accept = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  getPriorityLabel(priority: number | null): string {
    return getPriorityLabel(priority || 2);
  }

  getPriorityColor(priority: number | null): string {
    return getPriorityColor(priority || 2);
  }

  getStatusLabel(status: number | null): string {
    return getStatusLabel(status || 0);
  }

  getStatusColor(status: number | null): string {
    return getStatusColor(status || 0);
  }

  onAccept(): void {
    this.accept.emit();
  }

  onReject(): void {
    this.reject.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
