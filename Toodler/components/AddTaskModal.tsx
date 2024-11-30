import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';

// Modal component for adding a new task
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

  // Handles saving the new task
  const handleSave = () => {
    if (!name.trim()) {
      alert('Task name is required');
      return;
    }

    const newTask = {
      id: Date.now(),
      name,
      description,
      isFinished: status,
      listId,
    };

    onSave(newTask);
    // Reset form fields
    setName('');
    setDescription('');
    setStatus(false);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Header with title and close button */}
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Create New Task</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          {/* Input fields for task details */}
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
          {/* Button to save the new task */}
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
    shadowColor: '#000', // Shadow properties for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButtonText: {
    color: 'grey',
    fontSize: 18,
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
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
  },
});
