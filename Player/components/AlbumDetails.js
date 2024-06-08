import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



export default function AlbumDetails({trackName, artistsName}) {
  return (
    <View style={{justifyContent: 'center'}}>
      <Text style={styles.name}>{artistsName}</Text>
      <Text style={styles.name}>{trackName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    name:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#111',
    },
})