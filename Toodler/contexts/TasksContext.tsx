import React, { createContext, useState, ReactNode } from 'react';
import data from '@/data.json';

export interface Task {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
}

export interface TasksContextType {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  }
  
  export const TasksContext = createContext<TasksContextType | undefined>(undefined);
  
  export const TasksProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(data.tasks); // Initialize with data if needed
  
    return (
      <TasksContext.Provider value={{ tasks, setTasks }}>
        {children}
      </TasksContext.Provider>
    );
  };
