import { DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Item, ItemField } from '../types';

export const getMoveitems = (event: DragOverEvent, items: Item[], itemField: ItemField): Item[] => {
  const { active, over } = event;

  if (!over) return items;

  const activeIndex = items.findIndex((t) => t.id === active.id);
  const overIndex = items.findIndex((item) => item.id === over.id);
  const updatedTasks: Item[] = [...items];

  if (over.data.current?.type === 'Task') {
    if (items[activeIndex][itemField] !== items[overIndex][itemField]) {
      (updatedTasks[activeIndex][itemField as keyof Item] as string | number) =
        items[overIndex][itemField as keyof Item];
      updatedTasks.splice(activeIndex, 1);
      updatedTasks.splice(overIndex, 0, items[activeIndex]);
    } else {
      return arrayMove(updatedTasks, activeIndex, overIndex);
    }
  } else if (over.data.current?.type === 'Column') {
    const taskToMove = { ...items[activeIndex] };
    (taskToMove[itemField as keyof Item] as string | number) = String(over.id);
    updatedTasks.splice(activeIndex, 1);
    updatedTasks.push(taskToMove);
  }

  return updatedTasks;
};
