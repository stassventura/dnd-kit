import PlusIcon from '../icons/PlusIcon';
import ColumnContainer from './ColumnContainer';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import useColumns from '../hooks/useColumns';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import TaskCard from './TaskCard';
import useTasks from '../hooks/useTasks';
import useDrag from '../hooks/useDrag';

export default function KanbanBoard() {
  const { tasks, setTasks, createTask, deleteTask, updateTask } = useTasks();
  const { columns, setColumns, columnsId, createNewColumn, deleteColumn, updateColumn } =
    useColumns();
  const { onDragStart, onDragEnd, onDragOver, activeColumn, activeTask } = useDrag({
    setColumns,
    setTasks,
    columns,
    tasks,
  });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  return (
    <div className="mx-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px] container ">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}>
        <div className="m-auto flex gap-4 flex-col  w-full p-3 min-h-screen">
          <button
            className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor ring-rose-500 hover:ring-2 flex gap-2 p-4"
            onClick={() => createNewColumn()}>
            <PlusIcon />
            Add Column
          </button>
          <div className="flex gap-2 flex-wrap">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer
                  column={col}
                  key={col.id}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
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
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === activeColumn.id)}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            ) : null}
            {activeTask ? (
              <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />
            ) : null}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );
}
