import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function BoardItem({ board, onPress }: { board: any; onPress: () => void }) {
  return (
    <View style={styles.board}>
      <Text style={styles.boardTitle}>{board.name}</Text>
      <Pressable onPress={onPress}>
        <Image source={{ uri: board.thumbnailPhoto }} style={styles.boardThumbnail} />
      </Pressable>
    </View>
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
});
