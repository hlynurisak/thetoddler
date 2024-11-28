import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useBoardsContext } from '@/hooks/useBoardsContext'; // Import the custom hook
import data from '@/data.json'; // Keep importing for lists and tasks
import getTextColor from '@/utils/getTextColor';
import AddListModal from '@/components/AddListModal';
import EditListModal from '@/components/EditListModal';

export default function Board() {
  type BoardRouteProp = RouteProp<{ Board: { boardId: number } }, 'Board'>;
  const route = useRoute<BoardRouteProp>();

  // Use the boards from context
  const { boards } = useBoardsContext();

  // Static data for lists and tasks
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [boardLists, setBoardLists] = useState(data.lists);
  const [editingList, setEditingList] = useState<{
    id: number;
    name: string;
    color: string;
    boardId: number;
  } | null>(null);
  const tasks = data.tasks;

  // Get the board ID from the route params
  const BoardId = +(route.params?.boardId);

  // Retrieve the specific board from context
  const board = boards.find((b) => b.id === BoardId);

  // Helper functions remain the same
  const getListsForBoard = (boardId: number) => {
    return boardLists.filter((list) => list.boardId === boardId);
  };

  const getTasksForList = (listId: number) => {
    return tasks.filter((task) => task.listId === listId);
  };

  // Handle adding a new list
  const handleAddList = (newList: { id: number; name: string; color: string; boardId: number }) => {
    setBoardLists((prevLists) => [...prevLists, newList]);
  };

  // Handle editing a list
  const handleEditList = (updatedList: { id: number; name: string; color: string; boardId: number }) => {
    setBoardLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedList.id ? updatedList : list
      )
    );
  };

  // Handle deleting a list
  const handleDeleteList = (listId: number) => {
    setBoardLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  if (!board) {
    return <Text style={styles.errorText}>Board not found. Please select a valid board.</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={getListsForBoard(BoardId)}
        keyExtractor={(list) => list.id.toString()}
        ListHeaderComponent={
          <View style={styles.boardDetails}>
            <Image
              source={{ uri: board.thumbnailPhoto }}
              style={styles.boardImage}
            />
            <Text style={styles.boardTitle}>{board.name}</Text>
            {board.description && (
              <Text style={styles.boardDescription}>{board.description}</Text>
            )}
          </View>
        }
        renderItem={({ item: list }) => (
          <View style={[styles.list, { backgroundColor: list.color }]}>
            <Text style={[styles.listTitle, { color: getTextColor(list.color) }]}>
              {list.name}
            </Text>
            <FlatList
              data={getTasksForList(list.id)}
              keyExtractor={(task) => task.id.toString()}
              renderItem={({ item: task }) => (
                <View style={styles.task}>
                  <Text style={styles.taskName}>
                    {task.name} {task.isFinished ? "(Finished)" : "(Pending)"}
                  </Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
              )}
            />
            <View style={styles.listActions}>
              <Button
                title="Edit"
                onPress={() => {
                  setEditingList(list);
                  setEditModalVisible(true);
                }}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteList(list.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Create New List</Text>
      </TouchableOpacity>

      <AddListModal
        boardId={BoardId}
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddList}
      />

      {editingList && (
        <EditListModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onSave={(updatedList) => {
            setBoardLists((prevLists) =>
              prevLists.map((list) =>
                list.id === updatedList.id ? updatedList : list
              )
            );
            setEditModalVisible(false); // Close the modal after saving
          }}
          list={editingList}
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  boardDetails: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  boardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  boardDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  list: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 0.2,
    backgroundColor: '#f9f9f9',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
    marginBottom: 5,
    borderRadius: 4,
  },
  task: {
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#e9e9e9',
    borderRadius: 4,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskDescription: {
    fontSize: 14,
    color: '#555',
  },
  listActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
