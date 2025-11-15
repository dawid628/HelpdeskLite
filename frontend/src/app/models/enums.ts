//  Priority
// Status

export enum PriorityEnum {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  CRITICAL = 4,
}

export enum StatusEnum {
  OPEN = 1,
  IN_PROGRESS = 2,
  CLOSED = 3
}

export function getPriorityLabel(priority: PriorityEnum): string {
  const labels: Record<PriorityEnum, string> = {
    [PriorityEnum.LOW]: 'Low',
    [PriorityEnum.MEDIUM]: 'Medium',
    [PriorityEnum.HIGH]: 'High',
    [PriorityEnum.CRITICAL]: 'Critical',
  };

  return labels[priority];
}

export function getStatusLabel(status: StatusEnum): string {
  const labels: Record<StatusEnum, string> = {
    [StatusEnum.OPEN]: 'Open',
    [StatusEnum.IN_PROGRESS]: 'In progress',
    [StatusEnum.CLOSED]: 'Closed'
  };

  return labels[status];
}
