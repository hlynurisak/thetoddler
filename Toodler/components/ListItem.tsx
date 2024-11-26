import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ListItemProps {
  name: string;
  color: string;
}

export default function ListItem({ name, color }: ListItemProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, borderRadius: 8, marginVertical: 5 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});
