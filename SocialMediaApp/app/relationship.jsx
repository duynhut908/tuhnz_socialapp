import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import Header from '../components/Header'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import { useRouter } from 'expo-router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import { AuthContext } from '../context/AuthContext'
import Avatar from '../components/Avatar'

const relationship = () => {
    const [select, setSelect] = useState(0);
    const renderContent = () => {
        switch (select) {
            case 0:
                return <ListFriends />;
            case 1:
                return <ListFollowing />;
            case 2:
                return <ListFollower />;
            default:
                return <Text>Friends</Text>;
        }
    };
    return (
        <SrceenWrapper >
            <View style={styles.header}>
                <View>
                    <Header title="Relationship" showBackButton={true} />
                </View>
            </View >
            <View style={styles.tabConversations}>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 0 ? theme.colors.batwhite : 'transparent' }]} onPress={() => setSelect(0)}>
                    <Icon name='friends' size={hp(4.3)} color={select === 0 ? theme.colors.messWeight : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 1 ? theme.colors.batwhite : 'transparent' }]} onPress={() => setSelect(1)}>
                    <Icon name='friends' size={hp(4.3)} color={select === 1 ? '#dfc03f' : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 2 ? theme.colors.batwhite : 'transparent' }]} onPress={() => setSelect(2)}>
                    <Icon name='friends' size={hp(4.3)} color={select === 2 ? '#55df3f' : theme.colors.batwhite} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 3 ? theme.colors.batwhite : 'transparent' }]} onPress={() => setSelect(3)}>
                    <Icon name='friends' size={hp(4.3)} color={select === 3 ? '#1f1fbb' : theme.colors.batwhite} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.itemTabConversation, { backgroundColor: select === 4 ? theme.colors.batwhite : 'transparent' }]} onPress={() => setSelect(4)}>
                    <Icon name='friends' size={hp(4.3)} color={select === 4 ? '#ff7788' : theme.colors.batwhite} />
                </TouchableOpacity> */}
            </View>
            <View style={{ flex: 1 }}>
                {renderContent()}
            </View>
        </SrceenWrapper>
    )
}

const sizeAvatarDialog = hp(11)
const ListFriends = ({ }) => {

    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["friends", currentUser?.username], queryFn: () =>
            makeRequest.get("/relationships/friends").then((res) => {
                return res.data;
            })
    })
    console.log(data)
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.username.toString()}
            renderItem={({ item }) => <ItemFriend friend={item} />}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />
    )
}
const ItemFriend = ({ friend, }) => {
    const router = useRouter()

    const queryClient = useQueryClient()

    return (
        <TouchableOpacity style={styles.itemConversationContainer} onPress={() => router.push({
            pathname: 'profile',
            params: { user: JSON.stringify(friend) },
        })}>
            <View style={styles.avatarForm}>
                <Avatar size={sizeAvatarDialog - 15} link={friend ? friend?.link : null} />
            </View>
            <View style={styles.nameFriend}>
                <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">{friend?.name}</Text>
            </View>
            <View style={styles.callVideo}>
                <TouchableOpacity style={styles.itemCV}>
                    <Icon name='messages' color={theme.colors.mess} strokeWidth={0.25} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.itemCV}>
                    <Icon name='report' color={theme.colors.darkLight} size={28} />
                </TouchableOpacity >
            </View>
        </TouchableOpacity>
    )
}

const ListFollowing = ({ }) => {

    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["followingNotFriend", currentUser?.username], queryFn: () =>
            makeRequest.get("/relationships/followingNotFriend/" + currentUser?.username).then((res) => {
                return res.data;
            })
    })
    console.log(data)
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.username.toString()}
            renderItem={({ item }) => <ItemFollowing friend={item} />}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />
    )
}

const ItemFollowing = ({ friend, }) => {
    const router = useRouter()


    return (
        <TouchableOpacity style={styles.itemConversationContainer} onPress={() => router.push({
            pathname: 'profile',
            params: { user: JSON.stringify(friend) },
        })}>
            <View style={styles.avatarForm}>
                <Avatar size={sizeAvatarDialog - 15} link={friend ? friend?.link : null} />
            </View>
            <View style={styles.nameFriend}>
                <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">{friend?.name}</Text>
            </View>
            <View style={styles.callVideo}>
                {/* <TouchableOpacity style={styles.itemCV}>
                    <Icon name='messages' color={theme.colors.mess} strokeWidth={0.25} size={30} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.itemCV}>
                    <Icon name='report' color={theme.colors.darkLight} size={28} />
                </TouchableOpacity >
            </View>
        </TouchableOpacity>
    )
}

const ListFollower = ({ }) => {

    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data } = useQuery({
        queryKey: ["followerNotFriend", currentUser?.username], queryFn: () =>
            makeRequest.get("/relationships/followerNotFriend/" + currentUser?.username).then((res) => {
                return res.data;
            })
    })
    console.log(data)
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.username.toString()}
            renderItem={({ item }) => <ItemFollower friend={item} />}
            contentContainerStyle={{ paddingHorizontal: 8 }}
        />
    )
}

const ItemFollower = ({ friend, }) => {
    const router = useRouter()


    return (
        <TouchableOpacity style={styles.itemConversationContainer} onPress={() => router.push({
            pathname: 'profile',
            params: { user: JSON.stringify(friend) },
        })}>
            <View style={styles.avatarForm}>
                <Avatar size={sizeAvatarDialog - 15} link={friend ? friend?.link : null} />
            </View>
            <View style={styles.nameFriend}>
                <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">{friend?.name}</Text>
            </View>
            <View style={styles.callVideo}>
                {/* <TouchableOpacity style={styles.itemCV}>
                    <Icon name='messages' color={theme.colors.mess} strokeWidth={0.25} size={30} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.itemCV}>
                    <Icon name='report' color={theme.colors.darkLight} size={28} />
                </TouchableOpacity >
            </View>
        </TouchableOpacity>
    )
}

export default relationship

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
    nameDialog: {
        fontSize: hp(2.35),
        color: theme.colors.textLight,
        fontWeight: theme.fonts.bold,
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