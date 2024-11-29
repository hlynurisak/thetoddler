import React from 'react';
import { BoardsProvider } from '@/contexts/BoardsContext'; // Adjust the import path as necessary
import { ListsProvider } from '@/contexts/ListsContext';
import { TasksProvider } from '@/contexts/TasksContext';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <BoardsProvider>
      <ListsProvider>
        <TasksProvider>
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: '#007bff' }, 
              headerTintColor: '#ffffff', 
              headerTitleStyle: { fontWeight: 'bold', fontSize: 30 }, 
              headerTitleAlign: 'center', 
              title: 'Toodler', 
            }}
          />
        </TasksProvider>
      </ListsProvider>
    </BoardsProvider>
  );
}
