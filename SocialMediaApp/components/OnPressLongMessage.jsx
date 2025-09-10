// OnPressLongMessage.js
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Modal, View, Image, Pressable, Text, StyleSheet, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import { makeRequest } from '../api/axios';
import { hp, wp } from '../helpers/common';
import Avatar from './Avatar';
import PictureInMessage from './PictureInMessage';
import Sticker from './Sticker';

const sizeAvatar = hp(5)
const sizeSticker = wp(25)
const OnPressLongMessage = ({ visible, mess, typemess, onClose }) => {
    const { isLoading: isll, error: err, data: dataUserMess } = useQuery({
        queryKey: ["user", mess?.username], queryFn: () =>
            makeRequest.get("/users/" + mess?.username).then((res) => {
                return res.data;
            })
    })
    const { isLoading, error, data: sticker } = useQuery({
        queryKey: ["sticker", mess?.id_sticker], queryFn: () =>
            makeRequest.get("/messages/stickers/" + mess?.id_sticker).then((res) => {
                return res.data;
            })
    })
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
            <View style={styles.messageCard}>
                {mess?.type_message === 'sticker' ?
                    <View style={[styles.sticker, styles[`sticker-${typemess}`]]}>
                        <Sticker size={sizeSticker} link={sticker?.link} idSticker={mess?.id_sticker} />
                    </View> :
                    mess?.type_message === 'image' ?
                        <View style={[styles.image, styles[`sticker-${typemess}`]]}>
                            <PictureInMessage link={mess?.link_image} />
                        </View> :
                        <Text style={[styles.message, styles[`message-${typemess}`]]}>{mess?.content}</Text>}
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
    messageCard: {
        gap: 10,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    avatarLastMess: {
        width: sizeAvatar,
        height: sizeAvatar,
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '50%',
        alignSelf: 'flex-end'
    },
    message: {
        maxWidth: wp(65),
        padding: 8,
        borderRadius: 10,
        fontSize: 14,
        fontWeight: '500',
        flexWrap: 'wrap',
        whiteSpace: 'pre-wrap',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    'message-sent': {
        backgroundColor: 'rgb(44, 54, 201)', // màu nền
        marginLeft: 'auto', // đẩy sang trái (flex layout)
        color: 'white', // màu chữ
    },
    'message-received': {
        backgroundColor: 'rgb(187, 225, 236)', // màu nền
        marginRight: 'auto', // đẩy sang phải (flex layout)
        color: 'black', // màu chữ
    },
    sticker: {
        width: sizeSticker,
        height: sizeSticker,
        justifyContent: 'center',
        alignItems: 'center',
    },
    'sticker-sent': {
        marginLeft: 'auto', // đẩy sang trái (flex layout)
    },
    'sticker-received': {
        marginRight: 'auto', // đẩy sang phải (flex layout)
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OnPressLongMessage;
