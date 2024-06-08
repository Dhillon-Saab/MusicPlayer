import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import debounce from 'lodash.debounce';
import Slider from '@react-native-community/slider';

import { Audio } from 'expo-av';
import List from './components/DeezerSearch';

import AlbumCover from './components/AlbumCover';
import AlbumDetails from './components/AlbumDetails';
import Controls from './components/Controls';

const Tab = createBottomTabNavigator();

export default function App() {
  const [sound, setSound] = useState();
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [trackInfo, setTrackInfo] = useState({});

  useEffect(() => {
    return () => sound?.unloadAsync();
  }, [sound]);

  const debouncedUpdatePosition = debounce((position) => {
    if (!isSeeking) {
      setPosition(position);
    }
  }, 500, { leading: true, trailing: true });

  function updateSeeker(status) {
    if (status.isLoaded && !isSeeking) {
      debouncedUpdatePosition(status.positionMillis);
    }
  }

  async function handleSeekRelease(value) {
    if (sound) {
      await sound.setPositionAsync(value);
      setPosition(value);
      setIsSeeking(false);
      if (!isPlaying) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  }

  function selectTrack(track) {
    setSound(null); // Unload any current sound
    loadAudio(track.preview); // Assuming 'preview' is the track's audio URL
    setTrackInfo({ title: track.title, duration: track.duration, cover: track.album.cover, artist: track.artist.name });
  }

  async function loadAudio(audioUrl) {
    try {
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setDuration(status.durationMillis);
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate(updateSeeker);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  }

  function Player() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" hidden />
        <AlbumCover albumCover={trackInfo.cover} />
        <AlbumDetails trackName={trackInfo.title} artistsName={trackInfo.artist} />
        <Slider
          style={styles.slider}
          value={position}
          maximumValue={duration}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1a9274"
          onValueChange={value => {
            setIsSeeking(true);
            setPosition(value);
          }}
          onSlidingComplete={handleSeekRelease}
        />
        <Controls
          togglePlayPauseBtn={() => {
            setIsPlaying(!isPlaying);
            playPauseAudio();
          }}
          pause={!isPlaying}
          playNextSong={() => console.log("Next song functionality to be implemented")}
          playPrevSong={() => console.log("Previous song functionality to be implemented")}
          currentPosition={position}
          trackLength={duration}
          onSeek={setPosition}
          onSeekRelease={handleSeekRelease}
        />
      </View>
    );
  }

  function playPauseAudio() {
    if (sound) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  }

  function Lst() {
    return <List onTrackSelect={selectTrack} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Audio List' component={Lst} options={{
          tabBarIcon: ({ size, color }) => (<FontAwesome name="list" size={size} color={color} />)
        }} />
        <Tab.Screen name='Audio Player' component={Player} options={{
          tabBarIcon: ({ size, color }) => (<FontAwesome name="play" size={size} color={color} />)
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: 300,
    marginTop: 20,
  },
});
