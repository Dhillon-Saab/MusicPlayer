import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function Controls({
    togglePlayPauseBtn, 
    pause, 
    playNextSong, 
    playPrevSong,
    currentPosition,
    trackLength,
    onSeek,
    onSeekRelease
 }) {
    return (
        <View style={styles.container}>
{/* 

            <Slider style={styles.slider}
                value={currentPosition}
                maximumValue={trackLength}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#1a9274"
                onValueChange={onSeek}
                onSlidingComplete={onSeekRelease}></Slider> */}

            <View style={styles.controls}>
            <TouchableOpacity onPress={playNextSong}>
                <FontAwesome name="backward" size={20} color="#111" />
            </TouchableOpacity>

            {pause ?

                (<TouchableOpacity onPress={togglePlayPauseBtn}>
                    <FontAwesome name="play" size={30} color="#111" />
                </TouchableOpacity>)

                :
                (<TouchableOpacity onPress={togglePlayPauseBtn}>
                    <FontAwesome name="pause" size={30} color="#111" />
                </TouchableOpacity>)


            }

            <TouchableOpacity onPress={playPrevSong}>
                <FontAwesome name="forward" size={20} color="#111" />
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={loadAudio}>
            <AntDesign name="arrowup" size={20} color="black" />
            </TouchableOpacity> */}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    slider: {
        width: 300,
        marginTop: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    timeLabel: {
        color: '#111',
    },
    controls:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 40,
    }
})

function formatTime(time = 0) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}