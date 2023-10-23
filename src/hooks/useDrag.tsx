import { Item, ItemField } from '../types';
import { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { getEndColumns } from '../helpers/getEndColumns';
import { getMoveitems } from '../helpers/getMoveitems';

interface useDragProps {
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  itemField: ItemField;
}

const useDrag = ({ columns, setColumns, items, setItems, itemField }: useDragProps) => {
  const [activeColumn, setActiveColumn] = useState<string | null | number>(null);
  const [activeTask, setActiveTask] = useState<Item | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type;
    if (type === 'Column') {
      const id = event.active.id;
      return setActiveColumn(id);
    }
    if (type === 'Task') {
      return setActiveTask(event.active.data.current?.task);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const updatedColumns = getEndColumns(event, columns, activeTask);
    setColumns(updatedColumns);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || active.data.current?.type !== 'Task') return;

    const updatedTasks = getMoveitems(event, items, itemField);
    setItems(updatedTasks);
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    activeColumn,
    activeTask,
  };
};

export default useDrag;
