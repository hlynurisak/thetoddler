import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AddTaskModal from './AddTaskModal';

// Interface defining the props for the ListItem component
interface ListItemProps {
  name: string;
  color: string;
  listId: number;
}

// Component representing a list item with the ability to add tasks
export default function ListItem({ name, color, listId }: ListItemProps) {
  const [AddTaskModalVisible, setAddTaskModalVisible] = useState(false);

  // Opens the AddTaskModal when the add button is pressed
  const handleAddTask = () => {
    setAddTaskModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity onPress={handleAddTask}>
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
      {AddTaskModalVisible && (
        <AddTaskModal
          visible={AddTaskModalVisible}
          onClose={() => setAddTaskModalVisible(false)}
          onSave={() => {}}
          listId={listId}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
