import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import { useSocket } from '../context/SocketContext'
import Message from '../components/Message'
import { AuthContext } from '../context/AuthContext'

const Messages = () => {
    const socket = useSocket();
    const [messages, setMessages] = useState([]);
    const lastMessageRef = useRef(null);
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
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);
    return (
        <SrceenWrapper >
            <UserHeader />
            <MessagesOfRoom messages={messages} lastMessageRef={lastMessageRef} />
            <Tool />
        </SrceenWrapper>
    )
}
const MessagesOfRoom = ({ messages, lastMessageRef }) => {
    return (
        <ScrollView style={[styles.listMessages, { flex: 1 }]} ref={lastMessageRef}  contentContainerStyle={{ paddingBottom: 20 }}>
            {messages?.map((message, index) =>
                <Message mess={message} key={index} />
            )}
        </ScrollView>
    )
}

const UserHeader = ({ user, router }) => {
    const { currentUser } = useContext(AuthContext)
    return (
        <View style={styles.header}>
            <View>
                <Header title="Profile" showBackButton={true} />
            </View>
        </View >
    )
}
const Tool = () => {
    return (
        <View style={{ height: hp(5), backgroundColor: 'white', }}></View>
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
    listMessages: {
        flexGrow: 1,
        flexDirection: 'column',
        gap: 10,
        padding: 10,
    }
})