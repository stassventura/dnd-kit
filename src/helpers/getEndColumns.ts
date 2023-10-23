import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Item } from '../types';

export const getEndColumns = (event: DragEndEvent, columns: string[], activeTask: Item | null) => {
  const { active, over } = event;

  if (!over || activeTask) return columns;

  const activeColumnId = active.id;
  const overColumnId = over.id;

  const activeColumnIndex = columns.findIndex((col) => col === activeColumnId);
  const overColumnIndex = columns.findIndex((col) => col === overColumnId);

  return arrayMove(columns, activeColumnIndex, overColumnIndex);
};
