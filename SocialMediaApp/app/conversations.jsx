import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import Avatar from '../components/Avatar'
import { useRouter } from 'expo-router'

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
    return (
        <ScrollView
            style={[{ flex: 1, }]}
            contentContainerStyle={{ gap: 0 }}
        >
            {listmess?.map((_, index) => (
                <ItemConversation key={index} />
            ))}
        </ScrollView>
    );
}
const sizeAvatarDialog = hp(11)
const ItemConversation = () => {
    const router = useRouter();
    const onMessRoom = () => {
        router.push('messages')
    }
    return (
        <TouchableOpacity style={styles.itemConversationContainer} onPress={() => onMessRoom()}>
            <View style={styles.avatarForm}>
                <Avatar size={sizeAvatarDialog - 15} />
            </View>
            <View style={styles.contentDialog}>
                <Text style={styles.nameDialog} numberOfLines={1} ellipsizeMode="tail">An Thời Đại</Text>
                <Text style={styles.lastMessageInDialog} numberOfLines={1} ellipsizeMode="tail">Đây là một văn bản rất dài, dài đến mức không thể hiển thị hết trên một dòng</Text>
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