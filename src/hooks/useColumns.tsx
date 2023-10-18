import { helpers } from '../helpers';
import useTasks from './useTasks';
import { Column, Id } from '../types';
import { useState, useEffect, useMemo } from 'react';

function useColumns() {
  const id = helpers.generateId();
  const { tasks, setTasks } = useTasks();
  const initialColumns = JSON.parse(localStorage.getItem('columns') || '[]');
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const createNewColumn = () => {
    const columnToAdd: Column = {
      id,
      title: `New Column`,
    };
    setColumns((prevColumns) => [...prevColumns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  };

  const updateColumn = (id: Id, title: string) => {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  };

  return { columns, setColumns, columnsId, createNewColumn, deleteColumn, updateColumn };
}

export default useColumns;
