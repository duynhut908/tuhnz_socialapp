import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FullScreenImage from './FullScreenImage';

const Sticker = ({ size, link, idSticker, onPress }) => {
    return (
        <>
            <Pressable
                onPress={() => onPress && onPress(idSticker)}
                style={[styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: 8,
                }]}>
                <Image style={styles.avatarImage} resizeMode='cover' source={link ? { uri: link } : require('../assets/images/picture1.png')} />
            </Pressable>
        </>
    )
}

export default Sticker

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        //backgroundColor: "#ccc",
        alignSelf: "center", // căn giữa container trong parent
        alignItems: "center", // căn giữa ngang cho Image
        justifyContent: "center", // căn giữa dọc cho Image
    },
    avatarImage: {
        width: "100%",
        height: "100%"
    },
})