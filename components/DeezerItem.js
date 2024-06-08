import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ListItem = ({ title, duration, artist, imageUrl }) => {
  // Convert duration from milliseconds to minutes:seconds
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = ((duration % 60) / 10).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.albumArt} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{artist} · {formatDuration(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 25, // Makes it circular
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default ListItem;
