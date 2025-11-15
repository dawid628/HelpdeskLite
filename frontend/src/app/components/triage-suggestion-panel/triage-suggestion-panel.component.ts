import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TriageSuggestion} from '../../models/triage.model';
import { getPriorityLabel, getStatusLabel, getPriorityColor, getStatusColor } from '../../models/enums';

/**
 * Panel displaying AI triage suggestions with Accept/Reject options
 */
@Component({
  selector: 'app-triage-suggestion-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triage-suggestion-panel.component.html',
  styleUrls: ['./triage-suggestion-panel.component.css']
})
export class TriageSuggestionPanelComponent {
  @Input() suggestion: TriageSuggestion | null = null;
  @Input() loading: boolean = false;
  @Input() error: string | null = null;

  @Output() accept = new EventEmitter<TriageSuggestion>();
  @Output() reject = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  /**
   * Get priority label
   */
  getPriorityLabel(priority: number): string {
    return getPriorityLabel(priority);
  }

  /**
   * Get priority color
   */
  getPriorityColor(priority: number): string {
    return getPriorityColor(priority);
  }

  /**
   * Get status label
   */
  getStatusLabel(status: number): string {
    return getStatusLabel(status);
  }

  /**
   * Get status color
   */
  getStatusColor(status: number): string {
    return getStatusColor(status);
  }

  /**
   * Handle accept button click
   */
  onAccept(): void {
    if (this.suggestion) {
      this.accept.emit(this.suggestion);
    }
  }

  /**
   * Handle reject button click
   */
  onReject(): void {
    this.reject.emit();
  }

  /**
   * Handle close button click
   */
  onClose(): void {
    this.close.emit();
  }
}
