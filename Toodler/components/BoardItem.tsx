import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface BoardItemProps {
  name: string;
  description?: string;
  thumbnail?: string;
  onPress: () => void;
}

export default function BoardItem({ name, description, thumbnail, onPress }: BoardItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: thumbnail || 'path/to/default-thumbnail.png' }} style={styles.thumbnail} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  thumbnail: { width: 50, height: 50, borderRadius: 25 },
  details: { marginLeft: 10, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  description: { fontSize: 14, color: '#666' },
});
