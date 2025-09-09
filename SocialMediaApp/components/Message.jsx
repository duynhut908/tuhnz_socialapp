import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Avatar from './Avatar';
import { hp, wp } from '../helpers/common';
import Sticker from './Sticker';
import PictureInMessage from './PictureInMessage';
const sizeAvatar = hp(5)
const sizeSticker = wp(25)
const Message = ({ mess }) => {
    const { currentUser } = useContext(AuthContext)

    const typemess = mess?.username === currentUser?.username ? 'sent' : 'received';
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
        <View style={styles.messageCard}>
            {typemess === 'received' ? (
                mess.last === 'last' ? (
                    <View style={{ width: sizeAvatar, height: sizeAvatar }}>
                        <Avatar size={sizeAvatar} link={dataUserMess?.pic_avatar} />
                    </View>
                ) : (
                    <View style={{ width: sizeAvatar, height: sizeAvatar }} />
                )
            ) : (
                <View style={{ width: sizeAvatar }} />
            )}
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
    )
}

export default Message

const styles = StyleSheet.create({
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
    image:{
        justifyContent: 'center',
        alignItems: 'center',
    },
})