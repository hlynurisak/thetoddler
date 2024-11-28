import { createContext, useState, ReactNode } from 'react';
import data from '@/data.json'; // Adjust the import path as needed

export interface Board {
  id: number;
  name: string;
  description?: string;
  thumbnailPhoto: string;
}

export interface BoardsContextType {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

export const BoardsContext = createContext<BoardsContextType | undefined>(undefined);

export const BoardsProvider = ({ children }: { children: ReactNode }) => {
  const [boards, setBoards] = useState<Board[]>(data.boards); // Use initial data

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  );
};
