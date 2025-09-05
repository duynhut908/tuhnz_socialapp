import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Header from '../components/Header'
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router';
import Icon from '../assets/icons'
import Picture from '../components/Picture'

const album = ({ }) => {

    const maxDisplay = 4; // hiển thị tối đa 4 ảnh
    const router = useRouter();
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const note = JSON.parse(params.user);          // lấy giá trị note
    console.log(note)
    return (
        <SrceenWrapper >
                <View style={styles.header}>
                    <View>
                        <Header title="My Album" showBackButton={true} />
                    </View>
                </View >
                <MyAlbum user={note} router={router} />
        </SrceenWrapper>
    )
}

const MyAlbum = ({ user, router }) => {
    const maxDisplay = 4; // hiển thị tối đa 4 ảnh
    return (
        <View style={styles.myAlbumContainer}>

            <TypeAlbum time={2} maxDisplay={maxDisplay} titleAlbum="MY AVATAR" />

            <TypeAlbum time={13} maxDisplay={maxDisplay} titleAlbum="MY IMAGE" />
        </View>
    )
}
const TypeAlbum = ({ user, router, titleAlbum, time, maxDisplay }) => {
    const displayImages = Array.from({ length: Math.min(time, maxDisplay) });
    return (
        <View style={{ gap: 15 }}>
            <Text style={styles.titleAlbum}>{titleAlbum}</Text>
            <View style={styles.someImage}>
                {displayImages.map((_, index) => {
                    const isLast = index === maxDisplay - 1 && time > maxDisplay;
                    return (
                        <View key={index} style={styles.oneImage}>
                            <Picture size={hp(11)} />
                            {isLast && (
                                <View style={styles.plusOverlay}>
                                    <Text style={styles.plusText}>+{time - maxDisplay}</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
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
        height: hp(11),
        marginBottom: 10,
        marginHorizontal: 10,
        gap: 2.5
    },
    oneImage: {
        height: hp(11),
        width: hp(11),
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
})