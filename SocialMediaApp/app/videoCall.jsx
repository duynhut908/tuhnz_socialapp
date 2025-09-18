import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { hp, wp } from '../helpers/common'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useSocket } from '../context/SocketContext'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'
import { Audio } from "expo-av";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
const videoCall = () => {
    const socket = useSocket();
    const router = useRouter()
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const friend = JSON.parse(params.candidateVideoCall);          // lấy giá trị note
    console.log(friend)
    const test = {
        "link": "https://res.cloudinary.com/dg2x8dolt/image/upload/v1756902774/uploads/1756902773122-d46f6c80-8fe7-4254-8e0e-c438ebab2873.jpg",
        "name": "Duy Nhựt",
        "username": "dnhut"
    }
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const pc = useRef(null);

    // useEffect(() => {
    //     // setup camera
    //     pc.current = new RTCPeerConnection();

    //     mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    //         setLocalStream(stream);
    //         stream.getTracks().forEach((track) => pc.current.addTrack(track, stream));
    //     });

    //     pc.current.ontrack = (event) => {
    //         setRemoteStream(event.streams[0]);
    //     };

    //     // TODO: thêm socket logic offer/answer/ICE như mình đã demo ở trên

    //     return () => {
    //         pc.current.close();
    //     };
    // }, []);

    const soundRef = useRef(null);

    useEffect(() => {
        const playSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require("../assets/sounds/ring-call-mess.mp3"),
                { shouldPlay: true, isLooping: true } // lặp lại liên tục
            );
            soundRef.current = sound;
        };

        playSound();

        return () => {
            // dọn dẹp khi thoát màn hình
            if (soundRef.current) {
                soundRef.current.stopAsync();
                soundRef.current.unloadAsync();
            }
        };
    }, []);
    const stopRing = async () => {
        if (soundRef.current) {
            await soundRef.current.stopAsync();
        }
    };
    console.log(CameraType);
    const [facing, setFacing] = useState("front"); // mặc định camera trước
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        if (!permission) {
            requestPermission();
        }
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    Chưa cấp quyền camera
                </Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text style={{ color: "blue" }}>Cấp quyền</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SrceenWrapper >
            <View style={styles.header}>
                <Text style={styles.text}>{friend?friend.name:'Call Video'}</Text>
            </View>
            <View style={styles.header}>
                <Text style={{fontSize:hp(3),color:'#ccc'}}>Vẫn chưa hoàn thiện...</Text>
            </View>
            <View style={styles.interact}>
                <TouchableOpacity style={[styles.itemInteract, { backgroundColor: '#f0f0f0', }]} onPress={() => router.back()}>
                    <Icon name='micro' color={'blue'} strokeWidth={1} fill={theme.colors.mess} size={hp(5)} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemInteract, { height: hp(9), width: hp(9), backgroundColor: 'red', }]} onPress={() => router.back()}>
                    <Icon name='call' color='#ccc' size={hp(5)} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemInteract, { backgroundColor: '#f0f0f0', }]} onPress={() => stopRing()}>
                    <Icon name='volume' color='green' fill='green' size={hp(5)} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.myVideo} onPress={() => {
                setFacing(facing === "back" ? "front" : "back");
            }}>
                {/* <ImageBackground
                    source={require('../assets/images/backgroudWelcom.jpg')}
                    style={{ flex: 1 }}
                    resizeMode="cover"
                >
                 
                </ImageBackground> */}
                <CameraView style={{ flex: 1 }} facing={facing} />
            </TouchableOpacity>
        </SrceenWrapper>
    )
}

export default videoCall

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        height: hp(7),
        // borderBottomWidth: 0.5,
        // borderColor: '#c4d3d9',      // màu viền
        justifyContent: 'center'
    },
    text: {
        fontSize: hp(3.5),
        paddingLeft: 10,
        color: '#ccc',
        fontWeight: theme.fonts.bold
    },
    interact: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: wp(8),
        paddingBottom: hp(7)
    },
    itemInteract: {
        height: hp(8),
        width: hp(8),
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: '50%',
        borderWidth: 1,
        borderColor: '#333'
    },
    myVideo: {
        position: 'absolute',
        right: hp(1.5),
        top: hp(1.5),
        height: hp(25),
        width: wp(30),
        borderRadius: 10,
        overflow: 'hidden',
    }
})