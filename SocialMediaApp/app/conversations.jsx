import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import Avatar from '../components/Avatar'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/AuthContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import { SocketContext, useSocket } from '../context/SocketContext'
import { LinkingContext } from '@react-navigation/native'
import ActionSheet from 'react-native-actionsheet';

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
                return <ListConversations socket={socket} onlineUsers={onlineUsers} />;
            case 1:
                return <ListFriends onlineUsers={onlineUsers} />;
            case 2:
                return <Text>Menu</Text>;
            default:
                return <Text>Conversations</Text>;
        }
    };


    const socket = useSocket();
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (socket) {
            socket.on("getUsers", (users) => {
                setOnlineUsers(users);
            })
        };
    }, [socket]);

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
const ListConversations = ({ socket, onlineUsers }) => {


    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["rooms", currentUser?.username], queryFn: () =>
            makeRequest.get("/rooms/user").then((res) => {
                return res.data;
            })
    })

    return (
        <ScrollView
            style={[{ flex: 1, }]}
            contentContainerStyle={{ gap: 0 }}
        >
            {data?.map((conversation, index) => (
                <ItemConversation key={index} conversation={conversation} socket={socket} onlineUsers={onlineUsers} />
            ))}
        </ScrollView>
    );
}
const sizeAvatarDialog = hp(11)
const ItemConversation = ({ conversation, socket, onlineUsers }) => {
    const router = useRouter();

    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["dialog", conversation?.roomId], queryFn: () =>
            makeRequest.get("/messages/" + conversation?.roomId).then((res) => {
                return res.data;
            })
    })
    const lastMess = data?.[data.length - 1] || null;
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

    const actionSheetRef = useRef();

    const onLongPress = () => {
        actionSheetRef.current?.show();
    };
    const handleAction = (index) => {
        switch (index) {
            case 0:
                console.log("Chi tiết hội thoại");
                break;
            case 1:
                console.log("Xóa hội thoại");
                break;
            default:
                break;
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.itemConversationContainer} onPress={() => onMessRoom()} onLongPress={onLongPress}>
                <View style={styles.avatarForm}>
                    <Avatar size={sizeAvatarDialog - 15} link={filteredMembers[0]?.pic_avatar} />
                </View>
                <View style={styles.contentDialog}>
                    <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">{filteredMembers?.map(m => m.name).join(', ')}</Text>
                    <Text style={styles.lastMessageInDialog} numberOfLines={1} ellipsizeMode="tail">{lastSent}{lastMess ? lastMess.type_message === 'sticker' ? ': <Sticker>' : lastMess.type_message === 'image' ? ': <Image>' : `: ${lastMess.content}` : ''}</Text>
                </View>
                <View style={styles.status}>
                    {onlineUsers?.some(user => user?.username === filteredMembers[0]?.username) && filteredMembers?.length === 1 && <Icon name='dot' color={theme.colors.mess} size={15} />}
                </View>
            </TouchableOpacity>
            <ActionSheet
                ref={actionSheetRef}
                title={'Tùy chọn'}
                options={['Chi tiết', 'Xóa', 'Hủy']}
                cancelButtonIndex={2}
                destructiveButtonIndex={1}
                onPress={handleAction}
            />
        </>
    )
}

const ListFriends = ({ onlineUsers }) => {

    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["friends", currentUser?.username], queryFn: () =>
            makeRequest.get("/relationships/friends").then((res) => {
                return res.data;
            })
    })
    return (
        <ScrollView
            style={[{ flex: 1, }]}
            contentContainerStyle={{ gap: 0, paddingHorizontal: 8 }}
        >
            {data?.map((fr, index) => (
                <ItemFriend key={index} friend={fr} onlineUsers={onlineUsers} />
            ))}
        </ScrollView>
    )
}
const ItemFriend = ({ friend, onlineUsers }) => {
    const router = useRouter()
    const { isLoading: il, error: e, data: member } = useQuery({
        queryKey: ["memberChat", 3], queryFn: () =>
            makeRequest.get("/rooms/members?roomId=3").then((res) => {
                return res.data ?? null;
            }),
        enabled: !!friend?.username,
    })
    const { isLoading, error, data } = useQuery({
        queryKey: ["RoomOfYou", friend?.username], queryFn: () =>
            makeRequest.get("/rooms/getRoom?username=" + friend?.username).then((res) => {
                return res.data;
            })
    })
    const queryClient = useQueryClient()
    const mutationAddRoom = useMutation({
        mutationFn: () => makeRequest.post(`/rooms/addRoom`, friend),
        onSuccess: (res) => {
            // Làm mới dữ liệu sau khi mutation thành công
            queryClient.invalidateQueries({ queryKey: ['RoomOfYou', friend?.username] });
            router.push({
                pathname: 'messages',
                params: { roomMessage: JSON.stringify(res) },
            });
        },
        onError: (error) => {
            console.warn("Mutation failed:", error);
        },
    })
    const addRoom = () => {
        mutationAddRoom.mutate();
    }

    const onMessRoom = () => {
        if (data?.length > 0) {
            router.push({
                pathname: 'messages',
                params: { roomMessage: JSON.stringify(data) },
            });
        } else {
            addRoom()
        }
    }
    const onVideoRoom = () => {
        if (friend) {
            router.push({
                pathname: 'videoCall',
                params: { candidateVideoCall: JSON.stringify(friend) },
            })
        }
    }

    return (
        <TouchableOpacity style={styles.itemConversationContainer} onPress={() => onMessRoom()}>
            <View style={styles.avatarForm}>
                <Avatar size={sizeAvatarDialog - 15} link={friend ? friend?.link : null} />
            </View>
            <View style={styles.nameFriend}>
                <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">{friend?.name}</Text>
            </View>
            {onlineUsers?.some(user => user?.username === friend?.username) && <View style={styles.callVideo}>
                <TouchableOpacity style={styles.itemCV}>
                    <Icon name='call' color={theme.colors.mess} strokeWidth={0.25} size={28} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemCV} onPress={() => onVideoRoom()}>
                    <Icon name='video' color={theme.colors.mess} size={28} />
                </TouchableOpacity >
            </View>}
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
    },
    nameFriend: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 5,
        paddingHorizontal: 8
    },
    callVideo: {
        width: wp(28),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCV: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})