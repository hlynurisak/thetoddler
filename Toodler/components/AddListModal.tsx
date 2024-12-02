import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import ColorPicker, { Preview, Panel1, HueSlider } from 'reanimated-color-picker';

// Modal component for adding a new list
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
  const [color, setColor] = useState('#ffffff'); // Default color is white

  // Save the new list and reset fields
  const handleSave = () => {
    if (!name) {
      alert('Name is required');
      return;
    }

    const newList = {
      id: Date.now(), // Generate unique ID
      name,
      color,
      boardId,
    };

    onSave(newList);
    setName('');
    setColor('');
    onClose();
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
          <ColorPicker
            style={{ width: '100%' }}
            value={color}
            onChange={(color) => setColor(color.hex)}
            onComplete={(color) => setColor(color.hex)}
          >
            <Preview
              style={{ width: '100%', height: 40, marginBottom: 10 }}
              hideInitialColor={true}
            />
            <Panel1 
              style={{ width: '100%', height: 200, marginBottom: 10 }}
            />
            <HueSlider 
              style={{ width: '100%', height: 40, marginBottom: 10 }}
            />
          </ColorPicker>
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
});
