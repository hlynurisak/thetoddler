import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

export default function EditListModal({ list, onClose, onSave  }:
    {
        list: { id: number; name: string; color: string; boardId: number },
        onClose: () => void,
        onSave: (list: { id: number; name: string; color: string; boardId: number }) => void,
      })  {

  const [name, setName] = useState(list.name);
  const [color, setColor] = useState(list.color);

  const handleSave = () => {
    if (!name) {
      alert('Name is required');
      return;
    }

    const updatedList = { ...list, name, color };
    onSave(updatedList);
  };

  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Edit List</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
  },
});
