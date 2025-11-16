import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriorityEnum, getPriorityLabel, getPriorityColor } from '../../models/enums';

/**
 * Priority badge component for displaying ticket priority
 */
@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.css']
})
export class PriorityBadgeComponent {
  @Input({ required: true }) priority: PriorityEnum = PriorityEnum.MEDIUM;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  getLabel(): string {
    return getPriorityLabel(this.priority);
  }

  getColor(): string {
    return getPriorityColor(this.priority);
  }

  getSizeClass(): string {
    return `badge-${this.size}`;
  }
}
