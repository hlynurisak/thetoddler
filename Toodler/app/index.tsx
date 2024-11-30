import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import BoardItem from '@/components/BoardItem';
import AddBoardModal from '@/components/AddBoardModal';
import { Board } from '@/utils/dataManager';
import EditBoardModal from '@/components/EditBoardModal';
import { useBoardsContext } from '@/hooks/useBoardsContext';

// Component to display and manage boards
export default function Boards() {
  const router = useRouter();

  // Access boards from context
  const { boards, setBoards } = useBoardsContext();

  // State variables for modal visibility and board editing
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [boardToEdit, setBoardToEdit] = useState<Board | null>(null);

  // State variables for new or edited board details
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardPhoto, setNewBoardPhoto] = useState('');

  // Create a new board
  const handleCreateBoard = () => {
    const newBoard: Board = {
      id: Date.now(), // Unique ID
      name: newBoardName,
      description: newBoardDescription,
      thumbnailPhoto: newBoardPhoto,
    };

    setBoards([...boards, newBoard]);

    // Reset state and close modal
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPhoto('');
    setAddModalVisible(false);
  };

  // Edit an existing board
  const handleEditBoard = () => {
    if (boardToEdit) {
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === boardToEdit.id
            ? {
                ...board,
                name: newBoardName,
                description: newBoardDescription,
                thumbnailPhoto: newBoardPhoto,
              }
            : board
        )
      );
      setBoardToEdit(null);
      setEditModalVisible(false);

      // Reset state
      setNewBoardName('');
      setNewBoardDescription('');
      setNewBoardPhoto('');
    }
  };

  // Delete a board
  const handleDeleteBoard = () => {
    if (boardToEdit) {
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardToEdit.id));
      setBoardToEdit(null);
      setEditModalVisible(false);

      // Reset state
      setNewBoardName('');
      setNewBoardDescription('');
      setNewBoardPhoto('');
    }
  };

  // Open edit modal for a specific board
  const openEditModal = (board: Board) => {
    setBoardToEdit(board);
    setNewBoardName(board.name);
    setNewBoardDescription(board.description || '');
    setNewBoardPhoto(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* List of boards */}
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
        contentContainerStyle={{ paddingBottom: 50 }}
      />

      {/* Button to add a new board */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <Text style={styles.addButtonText}>Create New Board</Text>
      </TouchableOpacity>

      {/* Modal for adding a new board */}
      <AddBoardModal
        visible={addModalVisible}
        onClose={() => {
          setAddModalVisible(false);
          // Reset state when modal is closed
          setNewBoardName('');
          setNewBoardDescription('');
          setNewBoardPhoto('');
        }}
        onAddBoard={handleCreateBoard}
        boardName={newBoardName}
        setBoardName={setNewBoardName}
        boardDescription={newBoardDescription}
        setBoardDescription={setNewBoardDescription}
        boardPhoto={newBoardPhoto}
        setBoardPhoto={setNewBoardPhoto}
      />

      {/* Modal for editing an existing board */}
      {boardToEdit && (
        <EditBoardModal
          visible={editModalVisible}
          onClose={() => {
            setEditModalVisible(false);
            // Reset state when modal is closed
            setNewBoardName('');
            setNewBoardDescription('');
            setNewBoardPhoto('');
          }}
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

// Styles for the component
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
