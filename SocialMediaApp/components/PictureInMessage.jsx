import { Dimensions, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FullScreenImage from './FullScreenImage';
import { wp } from '../helpers/common';
const maxWidth = wp(60)
const PictureInMessage = ({ link }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 100, height: 100 }); // default

    useEffect(() => {
        if (link) {
            Image.getSize(
                link,
                (w, h) => {
                    if (w > maxWidth) {
                        const scale = maxWidth / w;
                        setSize({ width: maxWidth, height: h * scale });
                    } else {
                        setSize({ width: w, height: h });
                    }
                },
                (error) => {
                    console.log("Error loading image size:", error);
                }
            );
        }
    }, [link]);
    return (
        <>
            <Pressable
                onPress={() => setIsFullScreen(true)}
                style={[styles.container,
                {
                    width: size.width,
                    height: size.height,
                    borderRadius: 8,
                }]}>
                <Image style={styles.avatarImage} resizeMode='contain' source={link ? { uri: link } : require('../assets/images/picture1.jpg')} />
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

export default PictureInMessage

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