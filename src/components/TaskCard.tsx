import { Item } from '../types';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

interface TaskCard {
  task: Item;
}

const TaskCard: React.FC<TaskCard> = ({ task }) => {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
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
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] rounded-xl items-center flex text-left cursor-grab relative opacity-30
        border-2 border-rose-500
    "
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] rounded-xl  flex  hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task flex-col ">
      <p className=" overflow-y-hidden overflow-x-auto whitespace-pre-wrap">{task.title}</p>
      <p className=" overflow-y-hidden overflow-x-auto whitespace-pre-wrap">{task.description}</p>
      <p className="absolute right-[12px] top-[50%]  translate-y-[-50%]">{task.priority}</p>
    </div>
  );
};

export default TaskCard;
