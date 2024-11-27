import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#007bff' }, 
        headerTintColor: '#ffffff', 
        headerTitleStyle: { fontWeight: 'bold', fontSize: 30 }, 
        headerTitleAlign: 'center', 
        title: 'Toodler', 
      }}
    />
  );
}
