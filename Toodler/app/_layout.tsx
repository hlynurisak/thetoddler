import React from 'react';
// Import context providers
import { BoardsProvider } from '@/contexts/BoardsContext';
import { ListsProvider } from '@/contexts/ListsContext';
import { TasksProvider } from '@/contexts/TasksContext';
// Import navigation stack from expo-router
import { Stack } from 'expo-router';

// Root layout component that wraps the app with context providers and sets up the navigation stack
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
