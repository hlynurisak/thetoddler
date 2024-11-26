import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from "@react-navigation/native"


import data from '../data.json'; // Import the JSON file

export default function Boards() {
  const router = useRouter();

  const boards = data.boards;

  return (
    <FlatList
      data={boards}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: board }) => (
        <View style={styles.board}>
          <Text style={styles.boardTitle}>{board.name}</Text>
          <Pressable onPress={() => router.push(`/tabs/board?boardId=${board.id}`)}>
            <Image
              source={{ uri: board.thumbnailPhoto }}
              style={styles.boardThumbnail}
            />
          </Pressable>
          {/* Render lists for this board */}
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
