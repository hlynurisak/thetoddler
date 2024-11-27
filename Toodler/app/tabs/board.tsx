import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import data from '../../data.json'; // Import the JSON file
import getTextColor from '../../utils/getTextColor';

export default function Board() {
  type BoardRouteProp = RouteProp<{ Board: { boardId: number } }, 'Board'>;
  const route = useRoute<BoardRouteProp>();
  const boards = data.boards;
  const lists = data.lists;
  const tasks = data.tasks;

  // Get the board ID from the route params
  const BoardId = +(route.params?.boardId);

  // Retrieve the specific board
  const board = boards.find((b) => b.id === BoardId);

  // Helper function to get lists for a specific board
  const getListsForBoard = (boardId: number) => {
    return lists.filter((list) => list.boardId === boardId);
  };

  // Helper function to get tasks for a specific list
  const getTasksForList = (listId: number) => {
    return tasks.filter((task) => task.listId === listId);
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
          </View>
        )}
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
    alignItems: 'center', // Center the image and text
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
});
