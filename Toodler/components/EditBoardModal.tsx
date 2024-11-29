import React from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access the gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setBoardPhoto(result.assets[0].uri);
    }
  };

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
            placeholder="Board Name"
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
            placeholder="Enter Photo URL (Optional)"
            value={boardPhoto}
            onChangeText={setBoardPhoto}
          />
          <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
            <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
          </TouchableOpacity>
          {boardPhoto ? (
            <Image source={{ uri: boardPhoto }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.noImageText}>No Image Selected or URL Entered</Text>
          )}
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
  imagePickerButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  noImageText: {
    fontSize: 12,
    color: 'gray',
    marginVertical: 10,
  },
});
