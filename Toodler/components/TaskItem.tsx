import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Define the props for the TaskItem component
interface TaskItemProps {
  name: string;
  description?: string;
  isFinished: boolean;
  onPress: () => void;
}

// Component to display individual tasks
export default function TaskItem({
  name,
  description,
  isFinished,
  onPress,
}: TaskItemProps) {
  return (
    // Make the entire task item touchable
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {/* Display task name with conditional styling if finished */}
        <Text style={[styles.name, isFinished && styles.finished]}>
          {name}
        </Text>
        {/* Display task description if it exists */}
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Styles for the task item component
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 16,
  },
  finished: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
