import React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditBoardModal({
  visible,
  onClose,
  onEditBoard,
  boardName,
  setBoardName,
  boardDescription,
  setBoardDescription,
  boardPhoto,
  setBoardPhoto,
  onDelete,
}: {
  visible: boolean;
  onClose: () => void;
  onEditBoard: () => void;
  boardName: string;
  setBoardName: (text: string) => void;
  boardDescription: string;
  setBoardDescription: (text: string) => void;
  boardPhoto: string;
  setBoardPhoto: (text: string) => void;
  onDelete: () => void;
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.modalText}>Edit Board</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder={boardName}
            value={boardName}
            onChangeText={setBoardName}
          />
          <TextInput
            style={styles.input}
            placeholder="Description (optional)"
            value={boardDescription}
            onChangeText={setBoardDescription}
          />
          <TextInput
            style={styles.input}
            placeholder={boardPhoto}
            value={boardPhoto}
            onChangeText={setBoardPhoto}
          />
          <Button title="Save Changes" onPress={onEditBoard} />
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  cancelButtonText: {
    color: 'grey',
    fontSize: 18,
  },
  deleteButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff4d4d',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
