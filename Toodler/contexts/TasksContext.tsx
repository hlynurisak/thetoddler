import React, { createContext, useState, ReactNode } from 'react';
import data from '@/data.json';

// Define the Task interface representing a task object
export interface Task {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
}

// Define the context type for tasks
export interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// Create the TasksContext with an undefined default value
export const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Provider component to supply tasks context to its children
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  // Initialize tasks state with data from data.json
  const [tasks, setTasks] = useState<Task[]>(data.tasks);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};
