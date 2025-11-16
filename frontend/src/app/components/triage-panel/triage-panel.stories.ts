import type { Meta, StoryObj } from '@storybook/angular';
import { TriagePanelComponent } from './triage-panel.component';
import { PriorityEnum, StatusEnum } from '../../models/enums';

const meta: Meta<TriagePanelComponent> = {
  title: 'Components/TriagePanel',
  component: TriagePanelComponent,
  tags: ['autodocs'],
  argTypes: {
    suggestedPriority: {
      control: 'select',
      options: [PriorityEnum.LOW, PriorityEnum.MEDIUM, PriorityEnum.HIGH, PriorityEnum.CRITICAL],
      description: 'AI suggested priority',
    },
    suggestedStatus: {
      control: 'select',
      options: [StatusEnum.OPEN, StatusEnum.IN_PROGRESS, StatusEnum.CLOSED],
      description: 'AI suggested status',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
};

export default meta;
type Story = StoryObj<TriagePanelComponent>;

export const Default: Story = {
  args: {
    suggestedPriority: PriorityEnum.HIGH,
    suggestedStatus: StatusEnum.OPEN,
    suggestedTags: ['bug', 'ui', 'mobile'],
    reasoning: 'Set as HIGH priority because the issue appears to be blocking normal operations. Suggested tags: bug, ui, mobile based on content analysis. Assigned to available agent for review.',
    loading: false,
    error: null,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    error: null,
  },
};

export const Error: Story = {
  args: {
    loading: false,
    error: 'Failed to generate triage suggestion. Please try again.',
  },
};

export const CriticalSuggestion: Story = {
  args: {
    suggestedPriority: PriorityEnum.CRITICAL,
    suggestedStatus: StatusEnum.IN_PROGRESS,
    suggestedTags: ['critical', 'database', 'production'],
    reasoning: 'Classified as CRITICAL priority due to system downtime indicators. Recommended immediate action (IN_PROGRESS status) due to urgency level. Identified relevant areas: critical, database, production.',
    loading: false,
    error: null,
  },
};

export const LowPrioritySuggestion: Story = {
  args: {
    suggestedPriority: PriorityEnum.LOW,
    suggestedStatus: StatusEnum.OPEN,
    suggestedTags: ['feature', 'ui'],
    reasoning: 'Assigned LOW priority as this is a feature request rather than a critical issue. Suggested OPEN status for proper triage and assignment. Identified relevant areas: feature, ui.',
    loading: false,
    error: null,
  },
};

export const NoTags: Story = {
  args: {
    suggestedPriority: PriorityEnum.MEDIUM,
    suggestedStatus: StatusEnum.OPEN,
    suggestedTags: [],
    reasoning: 'Set as MEDIUM priority - standard issue to be addressed in normal workflow. No specific tags identified.',
    loading: false,
    error: null,
  },
};
