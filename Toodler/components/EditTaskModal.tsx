
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function EditTaskModal({
  visible,
  onClose,
  onSave,
  task,
  lists,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedTask: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  }) => void;
  task: {
    id: number;
    name: string;
    description: string;
    isFinished: boolean;
    listId: number;
  };
  lists: { id: number; name: string }[];
}) {
  const [name, setName] = React.useState(task.name);
  const [description, setDescription] = React.useState(task.description);
  const [status, setStatus] = React.useState(task.isFinished);
  const [selectedList, setSelectedList] = React.useState(task.listId);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Task name is required');
      return;
    }

    const updatedTask = {
      ...task,
      name,
      description,
      isFinished: status,
      listId: selectedList,
    };

    onSave(updatedTask); // Pass the updated task back to the parent
    onClose(); // Close the modal
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Edit Task</Text>
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
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setStatus(!status)}
          >
            <MaterialIcons
              name={status ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color={status ? '#007AFF' : '#999'}
            />
            <Text style={styles.checkboxLabel}>Is this task finished?</Text>
          </TouchableOpacity>
          <Picker
            selectedValue={String(selectedList)} // Convert selectedList to string
            onValueChange={(itemValue: string) => setSelectedList(Number(itemValue))} // Convert back to number
            style={styles.input}
          >
            {lists.map((list) => (
              <Picker.Item key={list.id} label={list.name} value={String(list.id)} /> // Convert list.id to string
            ))}
          </Picker>
          <Button title="Save Changes" onPress={handleSave} />
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});
