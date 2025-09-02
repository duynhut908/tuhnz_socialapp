import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import BackButton from './BackButton'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'

const Header = ({ title, showBackButton = false, mb = 10 }) => {
    const router = useRouter();

    return (
        <ImageBackground source={require('../assets/images/homeapp1.jpg')} style={[styles.container, { marginBottom: mb, }]}>
            <View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.35)', // darken ảnh
            }} />
            {
                showBackButton && (
                    <View style={styles.backButton}>
                        <BackButton router={router} />
                    </View>
                )
            }
            <Text style={styles.title}>{title || ""}</Text>
        </ImageBackground>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        overflow: "hidden",
    },
    title: {
        fontSize: hp(3),
        textShadowColor: 'rgba(0,0,0,0.8)', // màu bóng
        textShadowOffset: { width: 2, height: 2 }, // lệch theo x, y
        textShadowRadius: 4, // độ mờ bóng
        color: 'white',
        fontWeight: theme.fonts.bold,
    },
    backButton: {
        position: 'absolute',
        left: 0
    }
})