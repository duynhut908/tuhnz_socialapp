import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Header from '../components/Header'
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router';
import Icon from '../assets/icons'
import Picture from '../components/Picture'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import VideoPlayer from 'expo-video-player'
import { Ionicons } from '@expo/vector-icons'
import VideoDiv from '../components/VideoDiv'
import { useIsFocused } from '@react-navigation/native'

const album = ({ }) => {

    const maxDisplay = 4; // hiển thị tối đa 4 ảnh
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const note = JSON.parse(params.user);          // lấy giá trị note
    console.log(note?.username)

    const { isLoading, error, data } = useQuery({
        queryKey: ["pictureOfUser", note?.username], queryFn: () =>
            makeRequest.get("/posts/pictureOfUser/" + note?.username).then((res) => {
                return res.data;
            })
    })
    const { isLoading: il, error: ia, data: listAvatars } = useQuery({
        queryKey: ["all-avatar", note?.username], queryFn: () =>
            makeRequest.get("/users/all-avatar/" + note?.username).then((res) => {
                return res.data;
            }),
        enabled: !!note?.username,
    })
    const router = useRouter();
    const detailAlbum = (nameAlbum) => {
        router.push({
            pathname: 'albumList',
            params: {
                user: JSON.stringify(note),
                name: nameAlbum,
            }
        })
    }
    return (
        <SrceenWrapper >
            <View style={styles.header}>
                <View>
                    <Header title="My Album" showBackButton={true} />
                </View>
            </View >
            <MyAlbum user={note} pictureOfUser={data} avatarUser={listAvatars} detailAlbum={detailAlbum} />
        </SrceenWrapper>
    )
}
const sizePic = wp(30)
const MyAlbum = ({ user, pictureOfUser, avatarUser, detailAlbum }) => {
    const maxDisplay = 3; // hiển thị tối đa 4 ảnh
    return (
        <View style={styles.myAlbumContainer}>

            <TypeAlbum time={2} maxDisplay={maxDisplay} titleAlbum="MY AVATAR" data={avatarUser} user={user} detailAlbum={detailAlbum} />

            <TypeAlbum time={13} maxDisplay={maxDisplay} titleAlbum="MY IMAGE" data={pictureOfUser} user={user} detailAlbum={detailAlbum} />
        </View>
    )
}
const TypeAlbum = ({ user, data, titleAlbum, time, maxDisplay, detailAlbum }) => {
    const displayImages = Array.from({ length: Math.min(data?.length, maxDisplay) });
    const isFocused = useIsFocused();


    return (
        <View style={{ gap: 15 }}>
            <Text style={styles.titleAlbum}>{titleAlbum}</Text>
            <View style={styles.someImage}>
                {displayImages.map((_, index) => {
                    const img = data[index];
                    const isLast = index === maxDisplay - 1 && data.length > maxDisplay;
                    return (
                        <View key={index} style={styles.gridImage}>

                            {img.type === 'image' ? <Picture size={sizePic} link={img.link} /> :
                                img.type === 'video' ?
                                    <VideoDiv item={img} isFocused={isFocused} sizeVid={sizePic} /> :
                                    <Picture size={sizePic} link={img.link} />
                            }
                            {isLast && (
                                <TouchableOpacity style={styles.plusOverlay} onPress={() => detailAlbum(titleAlbum)}>
                                    <Text style={styles.plusText}>+{data.length - maxDisplay + 1}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    );
                })}
            </View>
        </View >
    )
}


export default album

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: wp(4)
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        height: hp(7),
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9',      // màu viền
        justifyContent: 'center'
    },
    myAlbumContainer: {
        flex: 1,
        padding: 5,
        paddingTop: 15,
    },
    titleAlbum: {
        fontSize: hp(2.4),
        fontWeight: theme.fonts.bold,
        color: '#d1f0f7',
        textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
        textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
        textShadowRadius: 2, // độ mờ bóng
        marginVertical: 10
    },
    someImage: {
        flexDirection: 'row',
        height: sizePic,
        marginBottom: 10,
        marginHorizontal: 10,
        gap: 2.5
    },
    oneImage: {
        height: sizePic,
        width: sizePic,
        backgroundColor: 'red',
        position: 'relative',
        borderRadius: 8,
    },
    plusOverlay: {
        ...StyleSheet.absoluteFillObject, // phủ toàn bộ view
        backgroundColor: 'rgba(0,0,0,0.5)', // nền bán trong suốt
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    plusText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: hp(2.5),
    },
    gridImage: {
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
})