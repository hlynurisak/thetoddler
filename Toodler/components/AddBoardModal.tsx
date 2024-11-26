import React from 'react';
import { View, Text, TextInput, Modal, StyleSheet, Button, TouchableOpacity } from 'react-native';

export default function AddBoardModal({
  visible,
  onClose,
  onAddBoard,
  boardName,
  setBoardName,
  boardDescription,
  setBoardDescription,
  boardPhoto,
  setBoardPhoto,
}: {
  visible: boolean;
  onClose: () => void;
  onAddBoard: () => void;
  boardName: string;
  setBoardName: (text: string) => void;
  boardDescription: string;
  setBoardDescription: (text: string) => void;
  boardPhoto: string;
  setBoardPhoto: (text: string) => void;
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Add a New Board</Text>
          <TextInput
            style={styles.input}
            placeholder="Board Name"
            value={boardName}
            onChangeText={setBoardName}
          />
          <TextInput
            style={styles.input}
            placeholder="Board Description (Optional)"
            value={boardDescription}
            onChangeText={setBoardDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Thumbnail Photo URL"
            value={boardPhoto}
            onChangeText={setBoardPhoto}
          />
          <Button title="Create Board" onPress={onAddBoard} />
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
