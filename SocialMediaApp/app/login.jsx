import { Alert, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helpers/common'
import Input from '../components/Input'
import Button from '../components/Button'
import { AuthContext } from '../context/AuthContext'

const login = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext);
    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Login', "Please fill all the fields!");
            return;
        }
        try {
            setLoading(true);
            const user = await login({
                username: emailRef.current,
                password: passwordRef.current,
            })
            Alert.alert("Login", user.name); 
            router.push('homeapp')
        }
        catch (err) {
            Alert.alert("Login Failed", err?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <SrceenWrapper bg="white">
            <StatusBar style='dark' />
            <ImageBackground
                source={require('../assets/images/backgroudWelcom.jpg')}
                style={styles.container}
                resizeMode="cover"
            >

                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.3)', // darken ảnh
                }} />

                <BackButton router={router} />

                <View>
                    <Text style={styles.welcomText}>Hey,</Text>
                    <Text style={styles.welcomText}>Welcom Back</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{
                        fontSize: hp(2), color: "white",
                        textShadowColor: 'rgba(0,0,0,0.9)',
                        textShadowOffset: { width: 1.5, height: 1.5 },
                        textShadowRadius: 3,
                    }}>
                        Please login to continue
                    </Text>
                    <Input
                        icon={<Icon name="mail" size={26} strokeWidth={1.6} color="white" />}
                        placeholder='Enter your email'
                        color="#c4d3d9"
                        onChangeText={value => emailRef.current = value}
                    />
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} color="white" />}
                        placeholder='Enter your password'
                        color="#c4d3d9"
                        secureTextEntry
                        onChangeText={value => passwordRef.current = value}
                    />
                    <Text style={styles.forgotPassword}>
                        Forgot Password
                    </Text>

                    <Button title={'Login'} loading={loading} onPress={onSubmit} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>
                    <Pressable onPress={() => router.push('signUp')}>
                        <Text style={[styles.footerText, { color: "#7cd1e5", fontWeight: theme.fonts.semibold }]}>Sign up</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </SrceenWrapper>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5)
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
    welcomText: {
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
        color: "white",
        textShadowColor: 'rgba(0,0,0,0.8)', // màu bóng
        textShadowOffset: { width: 2, height: 2 }, // lệch theo x, y
        textShadowRadius: 4, // độ mờ bóng
    },
    form: {
        gap: 25
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: "#c4d3d9"
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        textAlign: 'center',
        color: "white",
        fontSize: hp(1.9),
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowOffset: { width: 1.5, height: 1.5 },
        textShadowRadius: 2,
    }
})