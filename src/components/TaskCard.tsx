import TrashIcon from '../icons/TrashIcon';
import { Task, Id } from '../types';
import { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
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

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] rounded-xl items-center flex text-left hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task">
        <textarea
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"></textarea>
      </div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] rounded-xl items-center flex text-left hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}>
      <p className="my-aoto h-[90%] w-full overflow-y-hidden overflow-x-auto whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 top-1/2-translate-y-1/2 bg-columnBackgroundColor p-2 rounded-full opacity-60 hover:opacity-100 active:bg-red-600">
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;
