import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#007bff' }, // Customize the header background color
        headerTintColor: '#ffffff', // Customize the text color
        headerTitleStyle: { fontWeight: 'bold', fontSize: 18 }, // Customize the font style
        headerTitleAlign: 'center', // Center the title
        title: 'Toodler App', // Default title for all screens
      }}
    />
  );
}
