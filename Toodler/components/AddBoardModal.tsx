import React from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Modal component for adding a new board
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
  // Function to pick an image from the device's gallery
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Header with title and close button */}
          <View style={styles.headerRow}>
            <Text style={styles.modalText}>Create New Board</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelButtonText}>X</Text>
            </TouchableOpacity>
          </View>
          {/* Input fields for board details */}
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
            placeholder="Enter Photo URL (Optional)"
            value={boardPhoto}
            onChangeText={setBoardPhoto}
          />
          {/* Button to pick an image from the gallery */}
          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerButtonText}>Pick an Image</Text>
          </TouchableOpacity>
          {/* Display selected image or a placeholder message */}
          {boardPhoto ? (
            <Image source={{ uri: boardPhoto }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.noImageText}>
              No Image Selected or URL Entered
            </Text>
          )}
          {/* Button to create the new board */}
          <Button title="Create Board" onPress={onAddBoard} />
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
