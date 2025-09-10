import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FullScreenImage from './FullScreenImage';

const Picture = ({ size, link }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    return (
        <>
            <Pressable
                onPress={() => setIsFullScreen(true)}
                style={[styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: 8,
                }]}>
                <Image style={styles.avatarImage} resizeMode='cover' source={link ? { uri: link } : require('../assets/images/picture1.png')} />
            </Pressable>
            {/* Full Screen Modal */}
            <FullScreenImage
                visible={isFullScreen}
                link={link}
                onClose={() => setIsFullScreen(false)}
            />
        </>
    )
}

export default Picture

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