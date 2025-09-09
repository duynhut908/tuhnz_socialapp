import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import Avatar from '../components/Avatar'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/AuthContext'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import { SocketContext, useSocket } from '../context/SocketContext'

const Conversations = () => {
    const [select, setSelect] = useState(0);
    const getConversations = () => {
        setSelect(0);
    }
    const getListFriends = () => {
        setSelect(1)
    }
    const menuTab = () => {
        setSelect(2)
    }

    const renderContent = () => {
        switch (select) {
            case 0:
                return <ListConversations />;
            case 1:
                return <Text>Friends</Text>;
            case 2:
                return <Text>Menu</Text>;
            default:
                return <Text>Conversations</Text>;
        }
    };



    return (
        <SrceenWrapper >
            <View style={styles.header}>
                <View>
                    <Header title="Coversations" showBackButton={true} />
                </View>
            </View >
            <View style={styles.tabConversations}>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 0 ? theme.colors.batwhite : 'transparent' }]} onPress={() => getConversations()}>
                    <Icon name='conversation' size={hp(4.3)} color={select === 0 ? theme.colors.messWeight : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 1 ? theme.colors.batwhite : 'transparent' }]} onPress={() => getListFriends()}>
                    <Icon name='friends' size={hp(4.3)} color={select === 1 ? '#dfc03f' : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 2 ? theme.colors.batwhite : 'transparent' }]} onPress={() => menuTab()}>
                    <Icon name='menu' size={hp(4.3)} color={select === 2 ? '#55df3f' : theme.colors.batwhite} />
                </TouchableOpacity>
            </View>
            <View style={styles.bodyConversations}>
                {renderContent()}
                {/* <View style={[{ flex: 1, display: select === 0 ? 'flex' : 'none' }]}>
                    <ListConversations />
                </View>

                <View style={[{ flex: 1, display: select === 1 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>Friends</Text>
                </View>

                <View style={[{ flex: 1, display: select === 2 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text>Menu</Text>
                </View> */}
            </View>
        </SrceenWrapper>
    )
}
const ListConversations = () => {
    const listmess = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["rooms", currentUser?.username], queryFn: () =>
            makeRequest.get("/rooms/user?username=" + currentUser?.username).then((res) => {
                return res.data;
            })
    })

    const socket = useSocket();
    return (
        <ScrollView
            style={[{ flex: 1, }]}
            contentContainerStyle={{ gap: 0 }}
        >
            {data?.map((conversation, index) => (
                <ItemConversation key={index} conversation={conversation} socket={socket} />
            ))}
        </ScrollView>
    );
}
const sizeAvatarDialog = hp(11)
const ItemConversation = ({ conversation, socket }) => {
    const router = useRouter();

    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["dialog", conversation?.roomId], queryFn: () =>
            makeRequest.get("/messages/" + conversation?.roomId).then((res) => {
                return res.data;
            })
    })
    const lastMess =  data?.[data.length - 1] || null;
    const lastSent = lastMess?.username === currentUser?.username ? "Bạn" : lastMess?.name || "";
    // const [lastSent, setLastSent] = useState('')
    // useEffect(() => {
    //     setLastSent(data ? (lastMess?.username === currentUser?.username) ? "Bạn" : lastMess?.name : null)
    // }, [lastMess])
    const { isLoading: il, error: e, data: member } = useQuery({
        queryKey: ["memberChat", conversation?.roomId], queryFn: () =>
            makeRequest.get("/rooms/members?roomId=" + conversation?.roomId).then((res) => {
                return res.data;
            })
    })

    const filteredMembers = member ? member.filter(m => m.username !== currentUser?.username) : [];
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        const handleReceive = (msg) => {
            queryClient.invalidateQueries(["dialog", conversation?.roomId]);
        }

        socket.on('receiveMessage', handleReceive);

        return () => {
            socket.off('receiveMessage');
        };
    }, [conversation?.roomId, socket, queryClient])

    const onMessRoom = () => {
        router.push({
            pathname: 'messages',
            params: { roomMessage: JSON.stringify(member) },
        });
    }
    return (
        <TouchableOpacity style={styles.itemConversationContainer} onPress={() => onMessRoom()}>
            <View style={styles.avatarForm}>
                <Avatar size={sizeAvatarDialog - 15} link={filteredMembers[0]?.pic_avatar} />
            </View>
            <View style={styles.contentDialog}>
                <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">{filteredMembers?.map(m => m.name).join(', ')}</Text>
                <Text style={styles.lastMessageInDialog} numberOfLines={1} ellipsizeMode="tail">{lastSent}{lastMess?.content ? `: ${lastMess.content}` : ''}</Text>
            </View>
            <View style={styles.status}>
                <Icon name='dot' color={theme.colors.mess} size={15} />
            </View>
        </TouchableOpacity>
    )
}
export default Conversations

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        height: hp(7),
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9',      // màu viền
        justifyContent: 'center'
    },
    tabConversations: {
        height: hp(6.5),
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9'
    },
    itemTabConversation: {
        flex: 1,
        height: hp(6.5),
        borderLeftWidth: 0.25,
        borderRightWidth: 0.25,
        borderColor: '#c4d3d9',
        borderCurve: 'continuous',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyConversations: {
        flex: 1,
    },
    itemConversationContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    avatarForm: {
        height: sizeAvatarDialog,
        width: sizeAvatarDialog,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentDialog: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 5,
        borderTopWidth: 0.25,
        borderTopWidth: 0.25,
        borderColor: '#ccc',
        borderCurve: 'continuous',
        paddingLeft: 5
    },
    nameDialog: {
        fontSize: hp(2.35),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.bold,
    },
    lastMessageInDialog: {
        fontSize: hp(1.8),
        width: '100%',
        fontWeight: 450,
        color: '#a5bfc4',
        fontStyle: 'italic'
    },
    status: {
        width: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.25,
        borderTopWidth: 0.25,
        borderColor: '#ccc',
        borderCurve: 'continuous',
    }
})