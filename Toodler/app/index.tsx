import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import initialData from '../data.json';
import BoardItem from '../components/BoardItem';
import AddBoardModal from '../components/AddBoardModal';
import { createBoard } from '../utils/dataManager';

export default function Boards() {
  const router = useRouter();

  const [boards, setBoards] = useState(initialData.boards);
  const [modalVisible, setModalVisible] = useState(false);

  // Form state for new board
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardPhoto, setNewBoardPhoto] = useState('');

  const handleCreateBoard = () => {
    createBoard(boards, setBoards, newBoardName, newBoardDescription, newBoardPhoto);
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPhoto('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: board }) => (
          <BoardItem board={board} onPress={() => router.push(`/tabs/board?boardId=${board.id}`)} />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Create New Board</Text>
      </TouchableOpacity>

      <AddBoardModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddBoard={handleCreateBoard}
        boardName={newBoardName}
        setBoardName={setNewBoardName}
        boardDescription={newBoardDescription}
        setBoardDescription={setNewBoardDescription}
        boardPhoto={newBoardPhoto}
        setBoardPhoto={setNewBoardPhoto}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    position: 'absolute', 
    bottom: 20, 
    left: 0, 
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#007AFF', 
    padding: 10, 
    borderRadius: 10, 
    marginHorizontal: 20, 
  },
  addButtonText: {
    color: '#fff', 
    fontWeight: 'bold', 
  },
});
