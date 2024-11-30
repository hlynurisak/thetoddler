import React, { createContext, useState, ReactNode } from 'react';
import data from '@/data.json';

// Define the structure of a list item
export interface List {
  id: number;
  name: string;
  color: string;
  boardId: number;
}

// Define the context type for lists
export interface ListsContextType {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}

// Create the context for lists
export const ListsContext = createContext<ListsContextType | undefined>(undefined);

// Provider component that supplies the lists context to its children
export const ListsProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<List[]>(data.lists); // Initialize lists with data from data.json
  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
};
