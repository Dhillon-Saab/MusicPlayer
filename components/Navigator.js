import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Player from './Player';
import List from './DeezerSearch';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function Navigator() {
  return (
      <Tab.Navigator>
        <Tab.Screen name='Audio Player' component={Player} options={
            {tabBarIcon: ({size, color})=>  (<FontAwesome name="play" size={size} color={color} />)}
        }/>
        
        <Tab.Screen name='Audio List' component={List} options={
            {tabBarIcon: ({size, color})=>  (<FontAwesome name="list" size={size} color={color} />)}
        }/>

      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({

})