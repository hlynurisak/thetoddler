import React from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ColorPicker, { Preview, Panel1 } from 'reanimated-color-picker';

// Modal component for editing a list's name and color
export default function EditListModal({
  visible,
  onClose,
  onEditList,
  listName,
  setListName,
  listColor,
  setListColor,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  onEditList: () => void;
  listName: string;
  setListName: (text: string) => void;
  listColor: string;
  setListColor: (text: string) => void;
  onDelete: () => void;
}) {
  // Updates the list color when a new color is selected
  const updateColor = (colors: { hex: string }) => {
    setListColor(colors.hex);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Modal background overlay */}
      <View style={styles.modalBackground}>
        {/* Container for modal content */}
        <View style={styles.modalContainer}>
          {/* Header with title and close button */}
          <View style={styles.titleRow}>
            <Text style={styles.modalText}>Edit List</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          {/* Input field for list name */}
          <TextInput
            style={styles.input}
            placeholder={listName}
            value={listName}
            onChangeText={setListName}
          />
          {/* Label for color picker */}
          <Text style={styles.colorPickerLabel}>Pick a Color:</Text>
          {/* Color picker component */}
          <ColorPicker
            style={{ width: '100%' }}
            value={listColor}
            onChange={updateColor}
            onComplete={updateColor}
          >
            <Preview
              style={{ width: '100%', height: 40, marginBottom: 10 }}
              hideInitialColor={true}
            />
            <Panel1 />
          </ColorPicker>
          {/* Button to save changes */}
          <Button title="Save Changes" onPress={onEditList} />
          {/* Button to delete the list */}
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// Styles for the modal component
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
  },
  titleRow: {
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
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    marginTop: 5,
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
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
  colorPickerLabel: {
    fontSize: 14,
    marginBottom: 10,
  },
});
