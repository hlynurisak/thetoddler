import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

export default function AddListModal({
  boardId,
  onClose,
  onSave,
  visible,
}: {
  boardId: number;
  onClose: () => void;
  onSave: (list: { id: number; name: string; color: string; boardId: number }) => void;
  visible: boolean;
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
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Add New List</Text>
        <TextInput
          placeholder="List Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Color (optional)"
          value={color}
          onChangeText={setColor}
          style={styles.input}
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} />
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
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
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
