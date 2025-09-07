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
import ErrorBanner from '../components/ErrorBanner'

const SignUp = () => {
    const router = useRouter();
    const emailRef = useRef("");
    const nameRef = useRef("");
    const passwordRef = useRef("");
    const [loading, setLoading] = useState(false)
    const { signup } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const onSubmit = async () => {
        console.log(nameRef.current, emailRef.current, passwordRef.current)
        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert('Sign Up', "Please fill all the fields!");
            return;
        }
        try {
            setLoading(true);
            await signup({
                name: nameRef.current,
                email: emailRef.current,
                password: passwordRef.current,
            });
            Alert.alert("Sign Up", "Account created successfully!");
            router.push("login"); // hoặc push sang home nếu login tự động
        } catch (err) {
            if (err.response) {
                if (err.response.status === 409) {
                    setError("Email đã tồn tại, vui lòng thử lại!");
                } else if (err.response.status === 500) {
                    setError("Lỗi server, vui lòng thử lại sau!");
                } else if (err.response.status === 400) {
                    setError("Điền đẩy đủ dữ liệu!");
                } else {
                    setError(err.response.data?.error || "Có lỗi xảy ra!");
                }
            } else {
                setError("Không thể kết nối đến server");
            }
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
                    <Text style={styles.welcomText}>Let's,</Text>
                    <Text style={styles.welcomText}>Get Started</Text>
                </View>

                <View style={styles.form}>
                    <Text style={{
                        fontSize: hp(2), color: "white",
                        textShadowColor: 'rgba(0,0,0,0.9)',
                        textShadowOffset: { width: 1.5, height: 1.5 },
                        textShadowRadius: 3,
                    }}>
                        Please fill the details to create an account
                    </Text>
                    <Input
                        icon={<Icon name="user" size={26} strokeWidth={1.6} color="white" />}
                        placeholder='Enter your user'
                        color="#c4d3d9"
                        onChangeText={value => nameRef.current = value}
                    />
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
                    <ErrorBanner message={error} />
                    <Button title={'Sign up'} loading={loading} onPress={onSubmit} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account!
                    </Text>
                    <Pressable onPress={() => router.push('login')}>
                        <Text style={[styles.footerText, { color: "#7cd1e5", fontWeight: theme.fonts.semibold }]}>Login</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </SrceenWrapper>
    )
}

export default SignUp

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
        gap: 20
    },
    forgotPassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
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