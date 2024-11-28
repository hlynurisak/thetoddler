import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For the three-dot menu
import { useBoardsContext } from '@/hooks/useBoardsContext';
import data from '@/data.json';
import getTextColor from '@/utils/getTextColor';
import AddListModal from '@/components/AddListModal';
import EditListModal from '@/components/EditListModal';

export default function Board() {
  type BoardRouteProp = RouteProp<{ Board: { boardId: number } }, 'Board'>;
  const route = useRoute<BoardRouteProp>();

  const { boards } = useBoardsContext();

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

  const BoardId = +(route.params?.boardId);
  const board = boards.find((b) => b.id === BoardId);

  const getListsForBoard = (boardId: number) =>
    boardLists.filter((list) => list.boardId === boardId);

  const getTasksForList = (listId: number) =>
    tasks.filter((task) => task.listId === listId);

  const handleAddList = (newList: { id: number; name: string; color: string; boardId: number }) => {
    setBoardLists((prevLists) => [...prevLists, newList]);
  };

  const handleEditList = (updatedList: { id: number; name: string; color: string; boardId: number }) => {
    setBoardLists((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };

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
            <Image source={{ uri: board.thumbnailPhoto }} style={styles.boardImage} />
            <Text style={styles.boardTitle}>{board.name}</Text>
            {board.description && <Text style={styles.boardDescription}>{board.description}</Text>}
          </View>
        }
        renderItem={({ item: list }) => (
          <View style={[styles.list, { backgroundColor: list.color }]}>
            <View style={styles.listHeader}>
              <Text style={[styles.listTitle, { color: getTextColor(list.color) }]}>{list.name}</Text>
              <TouchableOpacity
                onPress={() => {
                  setEditingList(list);
                  setEditModalVisible(true);
                }}
              >
                <MaterialIcons name="more-vert" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={getTasksForList(list.id)}
              keyExtractor={(task) => task.id.toString()}
              renderItem={({ item: task }) => (
                <View style={styles.task}>
                  <Text style={styles.taskName}>
                    {task.name} {task.isFinished ? '(Finished)' : '(Pending)'}
                  </Text>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                </View>
              )}
            />
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
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
          onEditList={() => {
            handleEditList({
              id: editingList.id,
              name: editingList.name,
              color: editingList.color,
              boardId: editingList.boardId,
            });
            setEditModalVisible(false);
          }}
          listName={editingList.name}
          setListName={(name) =>
            setEditingList((prev) => (prev ? { ...prev, name } : prev))
          }
          listColor={editingList.color}
          setListColor={(color) =>
            setEditingList((prev) => (prev ? { ...prev, color } : prev))
          }
          onDelete={() => {
            handleDeleteList(editingList.id);
            setEditModalVisible(false);
          }}
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
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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