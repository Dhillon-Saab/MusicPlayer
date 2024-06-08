import { Text, View, Alert, StyleSheet } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import React, {Component, createContext} from 'react';
import { DataProvider } from 'recyclerlistview';

export const AudioContext = createContext()

export class Permissions extends Component {
  constructor(props){
    super(props)
    this.state= {
        audioFiles: [],
        permissionError: false,
        dataProvider: new DataProvider((r1, r2) => r1 != r2)
    }
  }

  permissionAlert = ()=>{
    Alert.alert("Permission Required", "This app requires the permission to read files in order to operate", 
    [{
        text: 'Continue',
        onPress: ()=> this.getPermission()
    },{
        text: 'Cancel',
        onPress: ()=>{
            this.permissionAlert();
        }
    }]);
  }

  getAudioFiles = async ()=>{
    const {dataProvider, audioFiles} = this.state
    let media = await MediaLibrary.getAssetsAsync({
        mediaType:'audio'
    })
    media = await MediaLibrary.getAssetsAsync({
        mediaType:'audio',
        first: media.totalCount,
    })
    console.log(media)

    this.setState({...this.state, dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]) ,audioFiles: [...audioFiles, ...media.assets]})
  }

  getPermission = async () =>{
    // {"canAskAgain": true, "expires": "never", "granted": false, "status": "undetermined"}
    const permission = await MediaLibrary.getPermissionsAsync();

    if(permission.granted){
        this.getAudioFiles();
    }

    if(!permission.canAskAgain && !permission.granted){
      this.setState({...this.state, permissionError: true});
    }

    if(!permission.granted && permission.canAskAgain){
        const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
        
        if(status=== 'denied' && canAskAgain){
            this.permissionAlert();
        }
        if(status==='granted'){
            this.getAudioFiles();
        }
        if(status=== 'denied' && !canAskAgain){
            this.setState({...this.state, permissionError: true})
        }
    }
  }

  componentDidMount(){
    this.getPermission();
  }
  
    render() {
      const {dataProvider, audioFiles, permissionError} = this.state;
      if(permissionError){
        <View style={styles.container}>
          <Text>It Looks Like, this application doesn't have media permissions.</Text>
        </View>
      }
    return (
        <AudioContext.Provider value={{audioFiles, dataProvider}}>
         {this.props.children}   
        </AudioContext.Provider>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Permissions