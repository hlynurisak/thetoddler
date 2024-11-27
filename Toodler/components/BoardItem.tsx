import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function BoardItem({ board, onPress, onEdit }: { board: any; onPress: () => void; onEdit: () => void }) {
  return (
    <View style={styles.board}>
      <View style={styles.titleRow}>
        <Text style={styles.boardTitle}>{board.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <MaterialIcons name="more-vert" size={24} color="blue" />
        </TouchableOpacity>
      </View>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  boardThumbnail: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
