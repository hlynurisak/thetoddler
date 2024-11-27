import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

interface AddListModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => void;
  existingList?: { id: number; name: string; color: string };
}

export default function AddListModal({
  visible,
  onClose,
  onSubmit,
  existingList,
}: AddListModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (existingList) {
      setName(existingList.name);
      setColor(existingList.color);
    } else {
      setName('');
      setColor('');
    }
  }, [existingList]);

  const handleSubmit = () => {
    onSubmit(name, color);
    setName('');
    setColor('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modal}>
        <TextInput
          placeholder="List Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="List Color (e.g., #FF5733)"
          value={color}
          onChangeText={setColor}
          style={styles.input}
        />
        <Button title="Save" onPress={handleSubmit} />
        <Button title="Cancel" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});
