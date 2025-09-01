import { StyleSheet, View, Text, Image, Pressable, ImageBackground } from 'react-native'
import React from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { StatusBar } from 'expo-status-bar'
import { wp, hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../api/axios'

const wellcome = () => {
    const router = useRouter();
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: () => makeRequest.get("/users/dnhut").then(res => res.data),
    });
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
                    backgroundColor: 'rgba(0,0,0,0.15)', // darken ảnh
                }} />
                
                <View style={[styles.containerImage, { width: wp(60), height: wp(60), borderRadius: wp(60) / 2 }]}>
                    <Image style={styles.welcomeImage} resizeMode='cover' source={{ uri: data?.pic_avatar ? data?.pic_avatar : "https://i.pinimg.com/1200x/c7/ae/0c/c7ae0c1fbc895034f124599eb9f10122.jpg" }} />
                </View>
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.punchline}>
                        Where every thought finds a home and every image tells a story.
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Button title='Getting Started'
                        buttonStyle={{ marginHorizontal: wp(3) }}
                        onPress={() => router.push('signUp')} />
                    <View style={styles.bottomTextContainer}>
                        <Text style={[styles.loginText]}>
                            Already have an account!
                        </Text>

                        <Pressable onPress={() => router.push('login')}>
                            <Text style={[styles.loginText, { color: '#7cd1e5', fontWeight: theme.fonts.semibold }]}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ImageBackground>
        </SrceenWrapper>
    )
}

export default wellcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    containerImage: {
        overflow: 'hidden',   // cắt phần thừa để thành hình tròn
        backgroundColor: '#ccc', // màu nền fallback nếu ảnh load chậm
        alignSelf: 'center'
    },
    welcomeImage: {
        width: '100%',
        height: '100%'
    },
    title: {
        color: 'white',
        fontSize: hp(5),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold,
        textShadowColor: 'rgba(0,0,0,0.8)', // màu bóng
        textShadowOffset: { width: 2, height: 2 }, // lệch theo x, y
        textShadowRadius: 4, // độ mờ bóng
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: wp(10),
        fontSize: hp(2),
        color: 'white',
        textShadowColor: 'rgba(0,0,0,0.7)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    footer: {
        gap: 30,
        width: '100%'
    },
    bottomTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        textAlign: 'center',
        color: "white",
        fontSize: hp(1.9),
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 2,
    }
})