import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import VideoPlayer from 'expo-video-player';
import { Ionicons } from '@expo/vector-icons';
import { wp } from '../helpers/common';
import { useIsFocused } from '@react-navigation/native';

const VideoDiv = ({ item, isFocused, sizeVid = wp(30) }) => {
    const videoRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        if (!isFocused && videoRef.current) {
            videoRef.current.stopAsync();
        }
    }, [isFocused]);
    return (
        <VideoPlayer
            videoProps={{
                ref: videoRef,
                shouldPlay: false,
                source: { uri: item.link },
                isLooping: true,
                resizeMode: isFullscreen ? 'contain' : 'cover'
            }}
            slider={sizeVid < 200 ? false : true}
            style={{ height: sizeVid, width: sizeVid, borderRadius: 8 }}
            fullscreen={{
                enterFullscreen: async () => {
                    if (videoRef.current) {
                        setIsFullscreen(true);
                        await videoRef.current.presentFullscreenPlayer();
                    }
                },
                exitFullscreen: async () => {
                    if (videoRef.current) {
                        await videoRef.current.dismissFullscreenPlayer();
                        setIsFullscreen(false);
                    }
                },
            }}
            icon={{
                play: (
                    <Ionicons
                        name="play"
                        size={sizeVid < 200 ? 30 : 40}
                        color="white"
                    />
                ),
                pause: (
                    <Ionicons
                        name="pause"
                        size={sizeVid < 200 ? 30 : 40}
                        color="white"
                    />
                ),
            }}
        />
    )
}
export default VideoDiv

const styles = StyleSheet.create({})