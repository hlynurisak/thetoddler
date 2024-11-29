import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function AddListModal({
  visible,
  onClose,
  onSave,
  boardId,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (list: { id: number; name: string; color: string; boardId: number }) => void;
  boardId: number;
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const handleSave = () => {
    if (!name) {
      alert('Name is required');
      return;
    }

    const newList = {
      id: Date.now(), // Unique ID for the new list
      name,
      color: color || '#ffffff', // Default color if none is provided
      boardId, // Attach the board ID passed as a prop
    };

    onSave(newList); // Pass the new list back to the parent
    setName(''); // Reset fields
    setColor('');
    onClose(); // Close the modal
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Create New List</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="List Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Color (optional)"
            value={color}
            onChangeText={setColor}
          />
          <Button title="Save" onPress={handleSave}/>
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
});
