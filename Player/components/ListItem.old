import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';

const thumbnailText = (filename) => filename[0];

const convertTime = (minutes)=>{
    if(minutes){
        const hrs = minutes/60;
        const minute = hrs.toString().split('.')[0];
        const percent = parseInt(hrs.toString().split('.')[1].slice(0,2));
        const sec = Math.ceil((60* percent)/100);

        if(parseInt(minute) <10 && sec < 10){
            return `0${minute}:0${sec}`;
        }

        if(parseInt(minute) <10){
            return `0${minute}:${sec}`;
        }
        
        if(sec <10){
            return `${minute}:0${sec}`;
        }
        
        return `${minute}:${sec}`;


    }
}

export default function ListItem({title, duration}) {
  return (
    <>
    <View style= {styles.container}>
      <View style= {styles.leftContainer}>
        <View style= {styles.thumbnail}>
            <Text style= {styles.thumbnailText}>{thumbnailText(title)}</Text>
        </View>
        <View style= {styles.titleContainer}>
            <Text numberOfLines={1} style= {styles.title}>{title}</Text>
            <Text numberOfLines={1} style= {styles.timeText}>{convertTime(duration)}</Text>
        </View>
      </View>
      <View style= {styles.rightContainer}>
      <Entypo name="dots-three-vertical" size={20} color="black" />
      </View>
    </View>
    <View style= {styles.border}/>
    </>
  )

}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        
        flexDirection: 'row',
        alignSelf: 'center',
        width: width - 80,
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexBasis: 50,
        height: 50,
        justifyContent: 'center',
        alignItems:'center',
    },
    thumbnail: {
        height: 50,
        flexBasis: 50,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    thumbnailText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    titleContainer:{
        width: width-180,
        paddingLeft: 10,

    },
    title:{
        fontSize: 20,
        color: 'black',
        
    },
    border:{
        width: width -80,
        backgroundColor: '#333',
        height: 0.5,
        opacity: 0.3,
        alignSelf: 'center',
        marginTop: 10,
    },
    timeText: {
        fontSize: 14,
        color: 'gray',
    }

});