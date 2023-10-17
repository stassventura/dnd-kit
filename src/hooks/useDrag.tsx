import { Task, Column } from '../types';
import { useState } from 'react';
import { DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

interface Props {
  setColumns: (columns: Column[]) => void;
  setTasks: (tasks: Task[]) => void;
  columns: Column[];
  tasks: Task[];
}

function useDrag({ setColumns, setTasks, columns, tasks }: Props) {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };
  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;
    if (activeColumnId === overColumnId) return;

    const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
    const overColumnIndex = columns.findIndex((col) => col.id === overColumnId);
    const updatedColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);

    setColumns(updatedColumns);
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';
    const isOverAColumn = over.data.current?.type === 'Column';

    if (!isActiveATask) return;

    const activeIndex = tasks.findIndex((t) => t.id === activeId);

    if (isActiveATask && isOverATask) {
      const overIndex = tasks.findIndex((t) => t.id === overId);

      if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
        const updatedTasks = [...tasks];
        updatedTasks[activeIndex].columnId = tasks[overIndex].columnId;
        const reorderedTasks = arrayMove(updatedTasks, activeIndex, overIndex);
        setTasks(reorderedTasks);
      } else {
        const reorderedTasks = arrayMove(tasks, activeIndex, overIndex);
        setTasks(reorderedTasks);
      }
    }

    if (isActiveATask && isOverAColumn) {
      const updatedTasks = [...tasks];
      updatedTasks[activeIndex].columnId = overId;
      setTasks(updatedTasks);
    }
  };

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    activeColumn,
    activeTask,
  };
}

export default useDrag;
