import { useSortable, SortableContext } from '@dnd-kit/sortable';
import TrashIcon from '../icons/TrashIcon';
import { Column, Id, Task } from '../types';
import { CSS } from '@dnd-kit/utilities';
import { useState, useMemo } from 'react';
import PlusIcon from '../icons/PlusIcon';
import TaskCard from './TaskCard';
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  createTask: (columnId: Id) => void;
  tasks?: Task[];
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask } = props;
  const [editMode, setEditeMode] = useState(false);
  const currentTasks = tasks?.filter((task) => task.columnId === column.id);
  const tasksIds = useMemo(() => {
    return tasks?.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
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
        onClick={() => {
          setEditeMode(true);
        }}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            {currentTasks?.length}
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditeMode(false)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditeMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2">
          <TrashIcon />
        </button>
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds || []}>
          {tasks &&
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
            ))}
        </SortableContext>
      </div>
      <button
        onClick={() => {
          createTask(column.id);
        }}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black transition-colors duration-300">
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
}

export default ColumnContainer;
