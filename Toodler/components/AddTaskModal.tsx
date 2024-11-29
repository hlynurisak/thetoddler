import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function AddTaskModal({
  visible,
  onClose,
  onSave,
  listId,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (newTask: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  }) => void;
  listId: number;
}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState(false);
  
    const handleSave = () => {
      if (!name.trim()) {
        alert('Task name is required');
        return;
      }
  
      const newTask = {
        id: Date.now(), // Generate a unique ID
        name,
        description,
        isFinished: status,
        listId,
      };
  
      onSave(newTask); // Pass the new task back to the parent
      // Reset the form fields
      setName('');
      setDescription('');
      setStatus(false);
      onClose(); // Close the modal
    };
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Create New Task</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
          />
          <Button title="Create Task" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15, // Adds spacing between the header and the input fields
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // Centers the text within its container
  },
  cancelButtonText: {
    color: 'grey',
    fontSize: 18, // Match font size with modalText
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  modalButtonText: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
    fontSize: 14,
  },
  container: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically centered
    margin: 10,
  },
  checkboxContainer: {
    marginRight: 8, // Space between the checkbox and the label
  },
  label: {
    fontSize: 16,
  },
});