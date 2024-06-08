import { View, Text, Dimensions, Image, StyleSheet } from 'react-native'
import React from 'react'

const {width} = Dimensions.get('window').width;
 
export default function AlbumCover({albumCover}) {
  return (
    <View style={{margin: 10}}>
      <Image source={{uri: albumCover}} style={{width: 300, height: 300, borderRadius: 5}}
      resizeMode={'contain'} />
    </View>
  )
}

const styles = StyleSheet.create({
  });