import { Text, View , StyleSheet, ScrollView, Dimensions} from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from './Permissions'
import { RecyclerListView ,LayoutProvider} from 'recyclerlistview'
import ListItem from './ListItem';

export class List extends Component {
static contextType = AudioContext;
layoutProvider = new LayoutProvider((i) => 'audio', (type,dim)=>{
    switch(type){
        case 'audio':
            dim.width = Dimensions.get('window').width;
            dim.height = 60;
            break;
        default:
            dim.width = 0;
            dim.height = 0;
    }


})

rowRenderer = (type ,item)=> {
    return <ListItem title={item.filename} duration={item.duration}></ListItem>
}
  render() {
    return (

        <AudioContext.Consumer>
            {({dataProvider, }) => {
                return (<View style = {{flex:1}}>

                <RecyclerListView dataProvider={dataProvider}  layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}/>
                </View>
                )
            }}
        </AudioContext.Consumer>

        // <ScrollView>
        //     {this.context.audioFiles.map(item=> <Text style={styles.audioItems} key={item.id}>{item.filename}</Text>)}
          
        // </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    audioItems:{
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 2

    }
})
export default List