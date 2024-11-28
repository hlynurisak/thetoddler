import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export default function EditListModal({
  visible,
  onClose,
  onSave,
  list,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (updatedList: { id: number; name: string; color: string; boardId: number }) => void;
  list: { id: number; name: string; color: string; boardId: number };
}) {
  const [name, setName] = useState(list.name);
  const [color, setColor] = useState(list.color);

  const handleSave = () => {
    if (!name) {
      alert('Name is required');
      return;
    }

    const updatedList = {
      ...list, // Preserve other list properties
      name,
      color,
    };

    onSave(updatedList); // Pass the updated list back to the parent
    onClose(); // Close the modal
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Edit List</Text>
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
          <Button title="Save" onPress={handleSave} />
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
});
