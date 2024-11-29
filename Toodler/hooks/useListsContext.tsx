import { useContext } from 'react';
import { ListsContext, ListsContextType } from '@/contexts/ListsContext';

export function useListsContext(): ListsContextType {
  const context = useContext(ListsContext);

  if (!context) {
    throw new Error('useListsContext must be used within a ListsProvider');
  }

  return context;
}
