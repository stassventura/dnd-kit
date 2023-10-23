import { Item } from '../types';

const priorityToNumber = (priority: string): number => {
  return parseInt(priority.slice(1));
};

export const sortItemsByPriority = (items: Item[]) => {
  return [...items].sort((a, b) => priorityToNumber(a.priority) - priorityToNumber(b.priority));
};
