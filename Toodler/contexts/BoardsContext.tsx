import { createContext, useState, ReactNode } from 'react';
import data from '@/data.json'; // Adjust the import path as needed

// Define the structure of a Board object
export interface Board {
  id: number;
  name: string;
  description?: string;
  thumbnailPhoto: string;
}

// Define the context type for boards
export interface BoardsContextType {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
}

// Create the context for boards
export const BoardsContext = createContext<BoardsContextType | undefined>(undefined);

// Provider component that supplies boards data to its children
export const BoardsProvider = ({ children }: { children: ReactNode }) => {
  // Initialize boards state with data from data.json
  const [boards, setBoards] = useState<Board[]>(data.boards);

  return (
    <BoardsContext.Provider value={{ boards, setBoards }}>
      {children}
    </BoardsContext.Provider>
  );
};
