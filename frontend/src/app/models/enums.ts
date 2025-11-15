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

export function getPriorityColor(priority: PriorityEnum): string {
  const colors: Record<PriorityEnum, string> = {
    [PriorityEnum.LOW]: 'gray',
    [PriorityEnum.MEDIUM]: 'blue',
    [PriorityEnum.HIGH]: 'orange',
    [PriorityEnum.CRITICAL]: 'red'
  };
  return colors[priority];
}

export function getStatusColor(status: StatusEnum): string {
  const colors: Record<StatusEnum, string> = {
    [StatusEnum.OPEN]: 'blue',
    [StatusEnum.IN_PROGRESS]: 'orange',
    [StatusEnum.CLOSED]: 'green'
  };
  return colors[status];
}
