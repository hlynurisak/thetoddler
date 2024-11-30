import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Interface for the Board object
interface Board {
  name: string;
  thumbnailPhoto: string;
  description: string;
}

// Component to render a single board item
export default function BoardItem({
  board,
  onPress,
  onEdit,
}: {
  board: Board;
  onPress: () => void;
  onEdit: () => void;
}) {
  return (
    <View style={styles.board}>
      <View style={styles.titleRow}>
        <Text style={styles.boardTitle}>{board.name}</Text>
        {/* Button to edit the board */}
        <TouchableOpacity style={styles.editButton} onPress={onEdit}>
          <MaterialIcons name="more-vert" size={24} color="blue" />
        </TouchableOpacity>
      </View>
      {/* Pressable image to navigate to the board */}
      <Pressable onPress={onPress}>
        <Image
          source={{ uri: board.thumbnailPhoto }}
          style={styles.boardThumbnail}
        />
      </Pressable>
      {/* Display the board description */}
      <Text>{board.description}</Text>
    </View>
  );
}

// Styles for the BoardItem component
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
