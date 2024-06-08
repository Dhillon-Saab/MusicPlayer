import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './components/Navigator';
import Permissions from './components/Permissions';
import { NavigationContainer } from '@react-navigation/native';
import ListItem from './components/ListItem';

export default function App() {
  return (
  <Permissions>
   <NavigationContainer>
      <Navigator/>

    </NavigationContainer>
    </Permissions>   

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
