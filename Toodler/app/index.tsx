import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BoardItem from '@/components/BoardItem';
import AddBoardModal from '@/components/AddBoardModal';
import { Board } from '@/utils/dataManager';
import EditBoardModal from '@/components/EditBoardModal';
import { useBoardsContext } from '@/hooks/useBoardsContext';

export default function Boards() {
  const router = useRouter();

  const {boards, setBoards} = useBoardsContext();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState<Board | null>(null);

  // States for new board creation & edits
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardPhoto, setNewBoardPhoto] = useState('');

  const handleCreateBoard = () => {
    // Create a new board
    const newBoard: Board = {
      id: Date.now(), // Unique ID for the new board
      name: newBoardName,
      description: newBoardDescription,
      thumbnailPhoto: newBoardPhoto,
    };

    setBoards([...boards, newBoard]);
    // Empty variables again and close the modal
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPhoto('');
    setAddModalVisible(false);
  };

  const handleEditBoard = () => {
    // Edit selected board
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
    // Clear variables
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPhoto('');
  };

  const handleDeleteBoard = () => {
    if (boardToEdit) {
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardToEdit.id));
      setBoardToEdit(null);
      setEditModalVisible(false);
      // Clear inputs
      setNewBoardName('');
      setNewBoardDescription('');
      setNewBoardPhoto('');
    }
  };

  const openEditModal = (board: Board) => {
    setBoardToEdit(board);
    setNewBoardName(board.name);
    setNewBoardDescription(board.description || '');
    setNewBoardPhoto(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatlist}
        data={boards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: board }) => (
          <BoardItem
            board={{ ...board, description: board.description || '' }}
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
          onDelete={handleDeleteBoard}
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
  flatlist: {
    paddingBottom: 50,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
