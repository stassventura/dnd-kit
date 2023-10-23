import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import useDrag from '../hooks/useDrag';
import TaskCard from './TaskCard';
import { Item, ItemField } from '../types';
import React, { useEffect, useState } from 'react';
import FilterIcon from '../icons/TrashIcon';
import useDndSensors from '../hooks/useDndSensors';
import { sortItemsByPriority } from '../helpers/sortItemsByPriority';

interface KanbanBoardProps {
  initialColumns: string[];
  initialItems: Item[];
  itemComponent: React.FC<{ task: Item }>;
  itemField: ItemField;
  onChange: (items: Item[]) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  initialColumns,
  initialItems,
  itemComponent,
  onChange,
  itemField,
}) => {
  const [columns, setColumns] = useState<string[]>(initialColumns);
  const [items, setItems] = useState<Item[]>(initialItems);
  const { sensors } = useDndSensors();
  const { onDragStart, onDragEnd, onDragOver, activeColumn, activeTask } = useDrag({
    columns,
    setColumns,
    items,
    setItems,
    itemField,
  });

  useEffect(() => {
    onChange(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const onSortClick = () => {
    setItems(sortItemsByPriority);
  };

  return (
    <>
      <div className="mx-auto w-full items-center overflow-x-auto overflow-y-hidden px-[40px] container p-3">
        <button
          className="uppercase h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 flex gap-2 p-4 mb-4"
          onClick={onSortClick}>
          <FilterIcon />
          sort by priority
        </button>
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}>
          <div className="m-auto flex gap-4 flex-col  w-full">
            <div className="flex gap-2 flex-wrap ">
              <SortableContext items={columns}>
                {columns.map((col) => (
                  <ColumnContainer
                    column={col}
                    key={col}
                    items={items.filter((item) => item[itemField] === col)}
                    itemComponent={itemComponent}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
          {createPortal(
            <DragOverlay>
              {activeColumn ? (
                <ColumnContainer
                  column={activeColumn}
                  key={activeColumn}
                  items={items.filter((item) => item[itemField] === activeColumn)}
                  itemComponent={itemComponent}
                />
              ) : null}
              {activeTask ? <TaskCard task={activeTask} /> : null}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </div>
    </>
  );
};

export default KanbanBoard;
