import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskItemProps {
  name: string;
  description?: string;
  isFinished: boolean;
}

export default function TaskItem({ name, description, isFinished }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.name, isFinished && styles.finished]}>{name}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  name: { fontSize: 16 },
  finished: { textDecorationLine: 'line-through', color: '#888' },
  description: { fontSize: 14, color: '#666' },
});
