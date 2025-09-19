// FullScreenImage.js
import React from 'react';
import { Modal, View, Image, Pressable, Text, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { hp, wp } from '../helpers/common';

const FullScreenImage = ({ visible, link, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType="fade"
            onRequestClose={onClose}
            backdropColor='transparent'
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}          // ⬅ Android cần cái này
        >
            <View style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.75)', // darken ảnh
            }} />
            <View style={styles.fullScreenContainer}>

                {/* Ảnh full screen */}
                <Image
                    style={{
                        width: wp(100),
                        height: hp(100),
                        resizeMode: 'contain',
                    }}
                    source={link ? { uri: link } : require('../assets/images/picture1.png')}
                />
                {/* Nút thoát */}
                <SafeAreaView style={styles.safeArea}>
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeText}>✕</Text>
                    </Pressable>
                </SafeAreaView>


            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fullScreenContainer: {
        ...StyleSheet.absoluteFillObject, // ⬅ phủ full màn
        justifyContent: 'center',
        alignItems: 'center',
    },
    safeArea: {
        position: 'absolute',
        top: 25,
        left: 0,
        right: 0,
        zIndex: 10, // đảm bảo ở trên cùng
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 12,
    },
    closeText: {
        fontSize: 22,
        color: 'white',
    },
});

export default FullScreenImage;
