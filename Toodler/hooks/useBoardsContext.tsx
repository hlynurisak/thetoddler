import { useContext } from 'react';
import { BoardsContext, BoardsContextType } from '@/contexts/BoardsContext';

export function useBoardsContext(): BoardsContextType {
  const context = useContext(BoardsContext);

  if (!context) {
    throw new Error('useBoardsContext must be used within a BoardsProvider');
  }

  return context;
}
