import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import initialData from '../data.json';
import BoardItem from '../components/BoardItem';
import AddBoardModal from '../components/AddBoardModal';
import { createBoard } from '../utils/dataManager';
import EditBoardModal from '../components/EditBoardModal';

export default function Boards() {
  const router = useRouter();

  const [boards, setBoards] = useState(initialData.boards);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState<{ id: number; name: string; description?: string; thumbnailPhoto: string } | null>(null);

  // State for new board creation
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardPhoto, setNewBoardPhoto] = useState('');

  const handleCreateBoard = () => {
    createBoard(boards, setBoards, newBoardName, newBoardDescription, newBoardPhoto);
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPhoto('');
    setAddModalVisible(false);
  };

  const handleEditBoard = () => {
    if (boardToEdit) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardToEdit.id
            ? { ...board, name: newBoardName, description: newBoardDescription, thumbnailPhoto: newBoardPhoto }
            : board
        )
      );
      setBoardToEdit(null);
      setEditModalVisible(false);
    }
  };

  const openEditModal = (board) => {
    setBoardToEdit(board);
    setNewBoardName(board.name);
    setNewBoardDescription(board.description || '');
    setNewBoardPhoto(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: board }) => (
          <BoardItem
            board={board}
            onPress={() => router.push(`/tabs/board?boardId=${board.id}`)}
            onEdit={() => openEditModal(board)}
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Text style={styles.addButtonText}>Create New Board</Text>
      </TouchableOpacity>

      <AddBoardModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddBoard={handleCreateBoard}
        boardName={newBoardName}
        setBoardName={setNewBoardName}
        boardDescription={newBoardDescription}
        setBoardDescription={setNewBoardDescription}
        boardPhoto={newBoardPhoto}
        setBoardPhoto={setNewBoardPhoto}
      />
      
      {boardToEdit && (
        <EditBoardModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onEditBoard={handleEditBoard}
          boardName={newBoardName}
          setBoardName={setNewBoardName}
          boardDescription={newBoardDescription}
          setBoardDescription={setNewBoardDescription}
          boardPhoto={newBoardPhoto}
          setBoardPhoto={setNewBoardPhoto}
        />
      )}
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
