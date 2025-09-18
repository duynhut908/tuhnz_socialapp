import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { makeRequest } from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import Avatar from './Avatar';
import { hp, wp } from '../helpers/common';
import Sticker from './Sticker';
import PictureInMessage from './PictureInMessage';
import OnPressLongMessage from './OnPressLongMessage';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
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
    const [showModal, setShowModal] = useState(false);
    const [showTool, setShowTool] = useState(false);
    return (
        <>
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
                        <TouchableOpacity style={[styles.message, styles[`message-${typemess}`]]} onLongPress={() => setShowTool(true)}>
                            <Text style={[styles.text, styles[`text-${typemess}`]]}>{mess?.content}</Text>
                        </TouchableOpacity>

                }
            </View>
            <ToolMess showTool={showTool} setShowTool={setShowTool} mess={mess} typemess={typemess} />
        </>
    )
}
const ToolMess = ({ showTool, setShowTool, mess, typemess }) => {
    return (
        <Modal transparent visible={showTool}
            animationType="fade"
            backdropColor='transparent'
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}          // ⬅ Android cần cái này
        >
            <TouchableWithoutFeedback onPress={() => setShowTool(false)}>
                <View style={styles.overlay}>

                    <View style={styles.toolbox}>
                        {/* Hàng trên: reaction icons */}
                        <View style={styles.reactionRow}>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: wp(8) }}>😍</Text></TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: wp(8) }}>😆</Text></TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: wp(8) }}>😭</Text></TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: wp(8) }}>😡</Text></TouchableOpacity>
                            <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: wp(8) }}>🙄</Text></TouchableOpacity>
                        </View>
                        <View style={[styles.message, styles[`message-${typemess}`]]}>
                            <Text style={[styles.text, styles[`text-${typemess}`]]}>{mess?.content}</Text>
                        </View>
                        {/* Hàng dưới: actions */}
                        <View style={styles.actionRow}>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="comment" size={25} color="#000" />
                                <Text style={{ fontSize: 12, color: '#333' }}>Reply</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="delete" size={25} color="red" />
                                <Text style={{ fontSize: 12, color: '#333' }}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="share" size={25} color="#fff333" />
                                <Text style={{ fontSize: 12, color: '#333' }}>Return</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionBtn}>
                                <Icon name="report" size={25} color="#555" />
                                <Text style={{ fontSize: 12, color: '#333' }}>Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}
export default Message

const styles = StyleSheet.create({
    messageCard: {
        flex: 1,
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
    text: {
        fontSize: 14,
        flexWrap: 'wrap',
        whiteSpace: 'pre-wrap',
        shadowColor: "#000",
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
    'text-sent': {
        marginLeft: 'auto', // đẩy sang trái (flex layout)
        color: 'white', // màu chữ
    },
    'text-received': {
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
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    toolbox: {
        overflow: "hidden",
        width: wp(70),
        gap: 10,
        padding: 10,
    },
    reactionRow: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        overflow: "hidden",
        borderRadius: 12,
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: '#ccc',
        padding: 8,
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.8)',
        overflow: "hidden",
        borderRadius: 12,
        borderRadius: 10,
        borderWidth: 0.25,
        borderColor: '#ccc',
        padding: 8,
    },
    actionBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
})