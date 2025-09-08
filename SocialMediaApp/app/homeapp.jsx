import { ActivityIndicator, Alert, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { AuthContext } from '../context/AuthContext'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import { StatusBar } from 'expo-status-bar'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import Posts from '../components/Posts'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'

const homeapp = () => {
    const router = useRouter();
    //Mở lại nếu xong
    const { currentUser, handleLogout } = useContext(AuthContext)
    useEffect(() => {
        if (!currentUser && router) {
            // đảm bảo router đã sẵn sàng
            setTimeout(() => {
                router.replace("welcome");
            }, 0);
        }
    }, [currentUser]);
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

    const { isLoading, error, data } = useQuery({
        queryKey: ["posts", currentUser], queryFn: () =>
            makeRequest.get("/posts/").then((res) => {

                return res.data;
            })
    })


    const [select, setSelect] = useState(0);
    const onPressHome = () => {
        setSelect(0)
    }
    const onPressFriends = () => {
        setSelect(1)
    }
    const onPressNotify = () => {
        setSelect(2)
    }
    const onPressMenu = () => {
        setSelect(3)
    }

    const renderContent = () => {
        switch (select) {
            case 0:
                if (isLoading) {
                    return (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={theme.colors.check} />
                        </View>
                    );
                }
                if (error) {
                    return (
                        <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
                            {error?.message || "Error"}
                        </Text>
                    );
                }
                return <Posts posts={data?.length ? data : []} />;
            case 1:
                return <Text>Friends</Text>;
            case 2:
                return <Text>Menu</Text>;
            default:
                return <Text>Conversations</Text>;
        }
    }
    return (
        <SrceenWrapper bg="white">
            <StatusBar style="dark" />
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
                    <TouchableOpacity style={styles.iconHeader} >
                        <Icon name="search" size={hp(4)} strokeWidth={2} color='#c4d3d9' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHeader} onPress={() => router.push('newPost')} >
                        <Icon name="newPost" size={hp(3.5)} strokeWidth={2} color='#c4d3d9' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHeader} onPress={() => router.push('conversations')} >
                        <Icon name="messages" size={hp(4)} strokeWidth={2} color='#c4d3d9' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconHeader} onPress={() => router.push({
                        pathname: 'profile',
                        params: { user: JSON.stringify(currentUser) },
                    })}>
                        <Icon name="user" size={hp(3.5)} strokeWidth={2} color='#c4d3d9' />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.body}>
                {renderContent()}
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.iconsFooter, { backgroundColor: select === 0 ? theme.colors.batwhite : 'transparent' }]} onPress={() => onPressHome()} >
                    <Icon name="home" size={hp(4.2)} strokeWidth={2} color={select === 0 ? theme.colors.messWeight : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconsFooter, { backgroundColor: select === 1 ? theme.colors.batwhite : 'transparent' }]} onPress={() => onPressFriends()}>
                    <Icon name="friends" size={hp(4.2)} strokeWidth={2} color={select === 1 ? theme.colors.messWeight : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconsFooter, { backgroundColor: select === 2 ? theme.colors.batwhite : 'transparent' }]} onPress={() => onPressNotify()}>
                    <Icon name="notify" size={hp(4.2)} strokeWidth={2} color={select === 2 ? theme.colors.messWeight : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconsFooter, { backgroundColor: select === 3 ? theme.colors.batwhite : 'transparent' }]} onPress={() => onPressMenu()}>
                    <Icon name="more" size={hp(4.2)} strokeWidth={2} color={select === 3 ? theme.colors.messWeight : theme.colors.batwhite} />
                </TouchableOpacity>
            </View>
            {/* <View>
                    <Text style={{ color: "white" }}>Chào mừng đến với Home App</Text>
                    <Button title={'Logout'} loading={loading} onPress={onSubmit} />
                    </View>*/}
        </SrceenWrapper >
    )
}
const Postss = () => {
    return (
        <View>

        </View>
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
        gap: 5,
        height: hp(7),
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9',      // màu viền
    },
    backgroundTitle: {
        flex: 4,
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
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        height: hp(8.5),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderColor: '#c4d3d9',
        borderCurve: 'continuous',
    },
    iconsFooter: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 0.25,
        borderRightWidth: 0.25,
        borderColor: '#c4d3d9',
        borderCurve: 'continuous',
    },
})