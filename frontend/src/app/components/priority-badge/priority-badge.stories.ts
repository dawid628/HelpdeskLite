import type { Meta, StoryObj } from '@storybook/angular';
import { PriorityBadgeComponent } from './priority-badge.component';
import { PriorityEnum } from '../../models/enums';

const meta: Meta<PriorityBadgeComponent> = {
  title: 'Components/PriorityBadge',
  component: PriorityBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: [PriorityEnum.LOW, PriorityEnum.MEDIUM, PriorityEnum.HIGH, PriorityEnum.CRITICAL],
      description: 'Priority level (1=Low, 2=Medium, 3=High, 4=Critical)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj<PriorityBadgeComponent>;

export const Low: Story = {
  args: {
    priority: PriorityEnum.LOW,
    size: 'medium',
  },
};

export const Medium: Story = {
  args: {
    priority: PriorityEnum.MEDIUM,
    size: 'medium',
  },
};

export const High: Story = {
  args: {
    priority: PriorityEnum.HIGH,
    size: 'medium',
  },
};

export const Critical: Story = {
  args: {
    priority: PriorityEnum.CRITICAL,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    priority: PriorityEnum.HIGH,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    priority: PriorityEnum.CRITICAL,
    size: 'large',
  },
};
