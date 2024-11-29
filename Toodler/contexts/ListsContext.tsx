import React, { createContext, useState, ReactNode } from 'react';
import data from '@/data.json';

export interface List {
  id: number;
  name: string;
  color: string;
  boardId: number;
}

export interface ListsContextType {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
}

export const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider = ({ children }: { children: ReactNode }) => {
  const [lists, setLists] = useState<List[]>(data.lists); // use initial data
  return (
    <ListsContext.Provider value={{ lists, setLists }}>
      {children}
    </ListsContext.Provider>
  );
};
