import { useSortable, SortableContext } from '@dnd-kit/sortable';
import { Item } from '../types';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import FireIcon from '../icons/FireIcon';

interface ColumnContainerProps {
  column: string | number;
  items: Item[];
  itemComponent: React.FC<{ task: Item }>;
}

const ColumnContainer: React.FC<ColumnContainerProps> = ({
  column,
  items,
  itemComponent: ItemComponent,
}) => {
  const tasksIds = useMemo(() => {
    return items?.map((task) => task.id);
  }, [items]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column,
    data: {
      type: 'Column',
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-40 border-2 border-rose-500"></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2 uppercase">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            {items.length}
          </div>
          {column}
        </div>
        <button className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2">
          <FireIcon />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds || []}>
          {items && items.map((task) => <ItemComponent key={task.id} task={task} />)}
        </SortableContext>
      </div>
    </div>
  );
};

export default ColumnContainer;
