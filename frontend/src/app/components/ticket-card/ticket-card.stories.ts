import type { Meta, StoryObj } from '@storybook/angular';
import { TicketCardComponent } from './ticket-card.component';
import { PriorityEnum, StatusEnum } from '../../models/enums';
import { Ticket } from '../../models/ticket.model';

const meta: Meta<TicketCardComponent> = {
  title: 'Components/TicketCard',
  component: TicketCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Visual variant of the card',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<TicketCardComponent>;

const mockTicket: Ticket = {
  id: 1,
  title: 'Login button not working on mobile',
  description: 'Users are reporting that the login button does not respond when clicked on mobile devices. This is affecting multiple users and needs urgent attention.',
  priority: PriorityEnum.HIGH,
  status: StatusEnum.OPEN,
  assignee_id: 2,
  assignee: {
    id: 2,
    name: 'John Agent',
    email: 'agent@example.com',
    role_id: 2,
    role: {
      id: 2,
      name: 'agent'
    }
  },
  reporter_id: 3,
  reporter: {
    id: 3,
    name: 'Jane Reporter',
    email: 'reporter@example.com',
    role_id: 3,
    role: {
      id: 3,
      name: 'reporter'
    }
  },
  tags: ['bug', 'mobile', 'ui'],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const Default: Story = {
  args: {
    ticket: mockTicket,
    loading: false,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    ticket: mockTicket,
    loading: false,
    variant: 'compact',
  },
};

export const Detailed: Story = {
  args: {
    ticket: mockTicket,
    loading: false,
    variant: 'detailed',
  },
};

export const Loading: Story = {
  args: {
    ticket: mockTicket,
    loading: true,
    variant: 'default',
  },
};

export const CriticalPriority: Story = {
  args: {
    ticket: {
      id: 2,
      title: 'URGENT: Production database down!',
      description: 'The production database is completely down. All users are affected!',
      priority: PriorityEnum.CRITICAL,
      status: StatusEnum.IN_PROGRESS,
      assignee_id: 2,
      assignee: {
        id: 2,
        name: 'John Agent',
        email: 'agent@example.com',
        role_id: 2,
        role: {
          id: 2,
          name: 'agent'
        }
      },
      reporter_id: 3,
      reporter: {
        id: 3,
        name: 'Jane Reporter',
        email: 'reporter@example.com',
        role_id: 3,
        role: {
          id: 3,
          name: 'reporter'
        }
      },
      tags: ['critical', 'database', 'production'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    loading: false,
    variant: 'default',
  },
};

export const LowPriority: Story = {
  args: {
    ticket: {
      id: 3,
      title: 'Add dark mode feature',
      description: 'It would be nice to have a dark mode option for the interface.',
      priority: PriorityEnum.LOW,
      status: StatusEnum.OPEN,
      assignee_id: 2,
      assignee: {
        id: 2,
        name: 'John Agent',
        email: 'agent@example.com',
        role_id: 2,
        role: {
          id: 2,
          name: 'agent'
        }
      },
      reporter_id: 3,
      reporter: {
        id: 3,
        name: 'Jane Reporter',
        email: 'reporter@example.com',
        role_id: 3,
        role: {
          id: 3,
          name: 'reporter'
        }
      },
      tags: ['feature', 'ui'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    loading: false,
    variant: 'default',
  },
};

export const Closed: Story = {
  args: {
    ticket: {
      id: 4,
      title: 'Fixed password reset issue',
      description: 'Password reset emails were not being sent. Issue has been resolved.',
      priority: PriorityEnum.MEDIUM,
      status: StatusEnum.CLOSED,
      assignee_id: 2,
      assignee: {
        id: 2,
        name: 'John Agent',
        email: 'agent@example.com',
        role_id: 2,
        role: {
          id: 2,
          name: 'agent'
        }
      },
      reporter_id: 3,
      reporter: {
        id: 3,
        name: 'Jane Reporter',
        email: 'reporter@example.com',
        role_id: 3,
        role: {
          id: 3,
          name: 'reporter'
        }
      },
      tags: ['bug', 'authentication'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    loading: false,
    variant: 'default',
  },
};

export const Unassigned: Story = {
  args: {
    ticket: {
      id: 5,
      title: 'New feature request: Export data',
      description: 'Users want to be able to export their data to CSV.',
      priority: PriorityEnum.MEDIUM,
      status: StatusEnum.OPEN,
      assignee_id: null,
      assignee: undefined,
      reporter_id: 3,
      reporter: {
        id: 3,
        name: 'Jane Reporter',
        email: 'reporter@example.com',
        role_id: 3,
        role: {
          id: 3,
          name: 'reporter'
        }
      },
      tags: ['feature'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    loading: false,
    variant: 'detailed',
  },
};

export const NoTags: Story = {
  args: {
    ticket: {
      id: 6,
      title: 'General inquiry about pricing',
      description: 'Customer asking about enterprise pricing options.',
      priority: PriorityEnum.LOW,
      status: StatusEnum.OPEN,
      assignee_id: 2,
      assignee: {
        id: 2,
        name: 'John Agent',
        email: 'agent@example.com',
        role_id: 2,
        role: {
          id: 2,
          name: 'agent'
        }
      },
      reporter_id: 3,
      reporter: {
        id: 3,
        name: 'Jane Reporter',
        email: 'reporter@example.com',
        role_id: 3,
        role: {
          id: 3,
          name: 'reporter'
        }
      },
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    loading: false,
    variant: 'default',
  },
};
