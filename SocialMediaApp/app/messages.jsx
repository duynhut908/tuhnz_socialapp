import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import { useSocket } from '../context/SocketContext'
import Message from '../components/Message'
import { AuthContext } from '../context/AuthContext'
import Icon from '../assets/icons'
import Input_ver2 from '../components/Input_ver2'
import { theme } from '../constants/theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const Messages = () => {
    const socket = useSocket();
    const { currentUser } = useContext(AuthContext)
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const room = 3
    const { isLoading, error, data: messagesOfRoom } = useQuery({
        queryKey: ["dialog", room], queryFn: () =>
            makeRequest.get("/messages/" + room).then((res) => {
                return res.data;
            })
    })
    useEffect(() => {
        if (!messagesOfRoom) return;

        const formattedMessages = messagesOfRoom.map((message, index) => {
            const isLastMessageByUser =
                index === messagesOfRoom.length - 1 ||
                message.username !== messagesOfRoom[index + 1]?.username;

            return {
                ...message,
                last: isLastMessageByUser ? 'last' : 'none'
            };
        });

        setMessages(formattedMessages);
    }, [messagesOfRoom]);
    useEffect(() => {
        if (!socket) return;

        socket.on('receiveMessage', (msg) => {
            setMessages((prevMessages) => {
                const updated = [...prevMessages];

                if (updated.length > 0 && updated[updated.length - 1].username === msg.username) {
                    updated[updated.length - 1].last = 'none';
                }
                updated.push({ ...msg, last: 'last' });
                return updated;
            });
        });
        return () => {
            socket.off('receive_message');
        };
    }, [room, socket])
    useEffect(() => {
        if (isAtBottom && lastMessageRef.current) {
            lastMessageRef.current.scrollToEnd({ animated: true });
        }
    }, [messages, isAtBottom]);
    useEffect(() => {
        const showSub = Keyboard.addListener("keyboardDidShow", () => {
            if (isAtBottom && lastMessageRef.current) {
                // delay 1 chút để bàn phím render xong rồi mới scroll
                setTimeout(() => {
                    lastMessageRef.current.scrollToEnd({ animated: true });
                }, 100);
            }
        });

        return () => showSub.remove();
    }, [isAtBottom, lastMessageRef]);
    const [fixKeyboard, setFixKeyboard] = useState(0)
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setFixKeyboard(hp(5)-2)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setFixKeyboard(0)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    const { isLoading: il, error: e, data: member } = useQuery({
        queryKey: ["memberChat", room], queryFn: () =>
            makeRequest.get("/rooms/members?roomId=" + room).then((res) => {
                return res.data;
            })
    })
    const filteredMembers = member ? member.filter(m => m.username !== currentUser?.username) : [];

    return (
        <SrceenWrapper >
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : fixKeyboard} // fix theo header
            >
                <UserHeader />
                <MessagesOfRoom messages={messages} lastMessageRef={lastMessageRef} setIsAtBottom={setIsAtBottom} isAtBottom={isAtBottom} />
                <Tool setMessages={setMessages} socket={socket} filteredMembers={filteredMembers} room={room} lastMessageRef={lastMessageRef} />
            </KeyboardAvoidingView>
        </SrceenWrapper>
    )
}
const MessagesOfRoom = ({ messages, lastMessageRef, setIsAtBottom }) => {


    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20; // khoảng cách cho phép coi như "ở cuối"
        const isBottom =
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
        setIsAtBottom(isBottom);
    };

    return (
        <ScrollView
            style={[styles.listMessages, { flex: 1, }]}
            ref={lastMessageRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 20, gap: 2.5 }}
            keyboardShouldPersistTaps="handled"
        >
            {messages?.map((message, index) => (
                <Message mess={message} key={index} />
            ))}
        </ScrollView>
    );
}

const UserHeader = ({ user, router }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <View style={styles.header}>
            <View>
                <Header title="Messages" showBackButton={true} />
            </View>
        </View >
    )
}
const Tool = ({ setMessages, socket, filteredMembers, room, lastMessageRef }) => {
    const [newMess, setNewMess] = useState('');
    const { currentUser } = useContext(AuthContext)
    const inputRef = useRef(null);
    const handleChange = (e) => {
        setNewMess(e.target.value)
    }
    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            handleSendMess()
        }
    }
    const queryClient = useQueryClient()
    const mutationSendMess = useMutation({
        mutationFn: (newMess) => makeRequest.post(`/messages/${room}`, newMess),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['dialog', room] });
        },
        onError: (error) => {
            console.error('Failed to send message:', error);
        },
    })

    const handleSendMess = () => {
        if (newMess !== null && newMess.trim() !== '') {
            const msg = {
                username: currentUser?.username,
                content: newMess.trim(),
                last: 'none'
            }
            socket?.emit('sendMessage', { message: msg, member: filteredMembers });
            setMessages((prevMessages) => [...prevMessages, msg]);
            mutationSendMess.mutate(msg);
            setNewMess('');
            lastMessageRef.current.scrollToEnd({ animated: true });
        } else {
            setNewMess('')
        }
        inputRef.current.focus();
    }

    return (
        <View style={styles.tool}>
            <TouchableOpacity style={styles.iconTool}
            >
                <Icon name="sticker" size={hp(5)} fill={'#80cee9'} color={'black'} />
            </TouchableOpacity>
            <View style={styles.inPutTool}>
                <TextInput
                    style={{
                        flex: 1,
                        color: theme.colors.textLight,
                        fontSize: hp(2)
                    }}
                    placeholderTextColor={'#9d9d9d'}
                    value={newMess} placeholder="Nhập tin nhắn đi mà..."
                    onChangeText={(text) => setNewMess(text)}
                    ref={inputRef}
                />
            </View>
            <TouchableOpacity style={styles.iconTool}
            //disabled={loading}
            //onPress={() => onPick(true)}
            >
                <Icon name="more" size={hp(4.2)} color={'#ccc'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconTool}
            //disabled={loading}
            onPress={() => handleSendMess()}
            >
                {newMess.trim() === '' ?
                    <Icon name="image" size={hp(4.2)} color={'#87ce56'} /> :
                    <Icon name="send" size={hp(4.2)} color={'#66e8ef'} />
                }
            </TouchableOpacity>
        </View>
    )
}
export default Messages

const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        height: hp(7),
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9',      // màu viền
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        marginTop: 45,
        marginBottom: 10,

    },
    listMessages: {
        flexGrow: 1,
        flexDirection: 'column',
        gap: 10,
        padding: 10,
    },
    tool: {
        height: hp(6.5),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderTopWidth: 0.5,          // độ dày viền
        borderColor: '#c4d3d9',
        gap: 5
    },
    iconTool: {
        flex: 1,
    },
    inPutTool: {
        flex: 6
    }
})