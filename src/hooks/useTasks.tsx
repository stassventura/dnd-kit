import { useEffect, useState } from 'react';
import { Task, Id } from '../types';
import { helpers } from '../helpers';

function useTasks() {
  const id = helpers.generateId();
  const initialTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id,
      columnId,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const updateTask = (id: Id, content: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  };

  return {
    tasks,
    setTasks,
    createTask,
    deleteTask,
    updateTask,
  };
}

export default useTasks;
