import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import APost from '../components/APost'
import Posts from '../components/Posts'

const homeapp = () => {
    const router = useRouter();
    //Mở lại nếu xong
    // const { currentUser, handleLogout } = useContext(AuthContext)
    // useEffect(() => {
    //     if (!currentUser && router) {
    //         // đảm bảo router đã sẵn sàng
    //         setTimeout(() => {
    //             router.replace("welcome");
    //         }, 0);
    //     }
    // }, [currentUser]);
    // console.log(currentUser)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            await handleLogout();
            Alert.alert("Logout", "Logout successfully");
        } catch (err) {
            console.log(err)
        }
    }
    //Mở lại nếu xong
    // if (!currentUser) {
    //      return null;
    //  }
    return (
        <SrceenWrapper bg="white">
            <StatusBar style="dark" />
            <ImageBackground
                source={require('../assets/images/backgroudWelcom.jpg')}
                style={styles.container}
                resizeMode="cover"
            >

                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.5)', // darken ảnh
                }} />
                <View style={styles.header}>
                    <ImageBackground
                        source={require('../assets/images/homeapp1.jpg')}
                        style={styles.backgroundTitle}
                        resizeMode="cover"
                    >
                        <View style={{
                            ...StyleSheet.absoluteFillObject,
                            backgroundColor: 'rgba(0,0,0,0.35)', // darken ảnh
                        }} />
                        <Text style={styles.title}>TUHNZ</Text>
                    </ImageBackground>

                    <View style={styles.icons}>
                        <Pressable>
                            <Icon name="notify" size={hp(3.5)} strokeWidth={2} color='#c4d3d9' />
                        </Pressable>
                        <Pressable>
                            <Icon name="mail" size={hp(3.5)} strokeWidth={2} color='#c4d3d9' />
                        </Pressable>
                        <Pressable>
                            <Icon name="user" size={hp(3.5)} strokeWidth={2} color='#c4d3d9' onPress={() => router.push('profile')} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.body}>

                    <Posts/> 

                </View>
                <View style={styles.footer}>
                    <Pressable style={styles.iconsFooter}>
                        <Icon name="home" size={hp(4.2)} strokeWidth={2} color='#c4d3d9' />
                    </Pressable>
                    <Pressable style={styles.iconsFooter}>
                        <Icon name="search" size={hp(4.2)} strokeWidth={2} color='#c4d3d9' />
                    </Pressable>
                    <Pressable style={styles.iconsFooter}>
                        <Icon name="friends" size={hp(4.2)} strokeWidth={2} color='#c4d3d9' />
                    </Pressable>
                    <Pressable style={styles.iconsFooter}>
                        <Icon name="more" size={hp(4.2)} strokeWidth={2} color='#c4d3d9' />
                    </Pressable>
                </View>
                {/* <View>
                    <Text style={{ color: "white" }}>Chào mừng đến với Home App</Text>
                    <Button title={'Logout'} loading={loading} onPress={onSubmit} />
                    </View>*/}
            </ImageBackground>
        </SrceenWrapper>
    )
}

export default homeapp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: wp(4)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 4,
        paddingTop: 10,
        paddingBottom: 10,
        height: hp(7),
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9',      // màu viền
    },
    backgroundTitle: {
        flex: 1,
        height: hp(5.5),
        justifyContent: 'center',
        borderTopRightRadius: 15,   // bo góc trên bên phải
        borderBottomRightRadius: 15, // bo góc dưới bên phải
        paddingHorizontal: 10,
        overflow: 'hidden',   // bắt buộc khi có nền màu hoặc ảnh
    },
    title: {
        textShadowColor: 'rgba(0,0,0,0.8)', // màu bóng
        textShadowOffset: { width: 2, height: 2 }, // lệch theo x, y
        textShadowRadius: 4, // độ mờ bóng
        color: 'white',
        fontSize: hp(3.5),
        fontWeight: theme.fonts.bold,

    },
    icons: {
        flexDirection: 'row',
        gap: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    body: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(8.5),
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderTopWidth: 0.5,          // độ dày viền
        borderColor: '#c4d3d9',      // màu viền
        padding: 10,             // khoảng cách bên trong
    },
    iconsFooter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})