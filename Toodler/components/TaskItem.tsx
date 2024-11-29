import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TaskItemProps {
  name: string;
  description?: string;
  isFinished: boolean;
  onPress: () => void;
}

export default function TaskItem({ name, description, isFinished, onPress }: TaskItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.name, isFinished && styles.finished]}>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderColor: '#ccc' 
  },
  name: { 
    fontSize: 16 
  },
  finished: { 
    textDecorationLine: 'line-through', 
    color: '#888' 
  },
  description: { 
    fontSize: 14, 
    color: '#666' 
  },
});
