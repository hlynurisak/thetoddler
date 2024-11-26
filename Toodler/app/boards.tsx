import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import data from '../data.json'; // Import the JSON file

export default function Boards() {
  const boards = data.boards;
  const lists = data.lists;
  const tasks = data.tasks;

  // Helper function to get lists for a specific board
  const getListsForBoard = (boardId: number) => {
    return lists.filter((list) => list.boardId === boardId);
  };

  // Helper function to get tasks for a specific list
  const getTasksForList = (listId: number) => {
    return tasks.filter((task) => task.listId === listId);
  };

  // Helper function to get text color based on background color 
  const getTextColor = (backgroundColor: string) => {
    // Convert HEX to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
  
    // Calculate luminance
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  
    // Return black or white
    return luminance > 0.5 ? '#000' : '#FFF';
  }

  return (
    <FlatList
      data={boards}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: board }) => (
        <View style={styles.board}>
          <Text style={styles.boardTitle}>{board.name}</Text>
          <Image
            source={{ uri: board.thumbnailPhoto }}
            style={styles.boardThumbnail}
          />
          {/* Render lists for this board */}
          <FlatList
            data={getListsForBoard(board.id)}
            keyExtractor={(list) => list.id.toString()}
            renderItem={({ item: list }) => (
              <View style={[styles.list, { backgroundColor: list.color }]}>
                <Text style={[styles.listTitle, { color: getTextColor(list.color) }]}>
                  {list.name}
                </Text>
                {/* Render tasks for this list */}
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
      )}
    />
  );
}

const styles = StyleSheet.create({
  board: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boardThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
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
