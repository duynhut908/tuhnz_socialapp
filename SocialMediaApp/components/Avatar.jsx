import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Avatar = ({ size }) => {
    return (
        <View style={[styles.container,
        {
            width: size,
            height: size,
            borderRadius: size / 2
        }]}>
            <Image style={styles.avatarImage} resizeMode='cover' source={require('../assets/images/avatar.jpg')} />
        </View>
    )
}

export default Avatar

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        backgroundColor: "#ccc",
        alignSelf: "center", // căn giữa container trong parent
        alignItems: "center", // căn giữa ngang cho Image
        justifyContent: "center", // căn giữa dọc cho Image
    },
    avatarImage: {
        width: "100%",
        height: "100%"
    },
})