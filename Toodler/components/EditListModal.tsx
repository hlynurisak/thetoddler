import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.modalText}>Edit List</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="List Name"
            value={listName}
            onChangeText={setListName}
          />
          <TextInput
            style={styles.input}
            placeholder="Color (Optional)"
            value={listColor}
            onChangeText={setListColor}
          />
          <Button title="Update" onPress={onEditList} />
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
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
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
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