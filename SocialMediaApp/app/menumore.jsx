import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import Header from '../components/Header'
import { hp, wp } from '../helpers/common'
import ButtonIcon_ver2 from '../components/ButtonIcon_ver2'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/AuthContext'

const MenuMore = () => {
    const router = useRouter()
    const { currentUser, handleLogout } = useContext(AuthContext)
    const defaultItems = [
        { "label": "Home", "name": "home", "color": "#6abfdd", "fill": '#ccc', onPress: () => router.push('homeapp') },
        {
            "label": "Profile", "name": "user", "color": "#ddb06a", "fill": '#ccc', onPress: () => router.push({
                pathname: 'profile',
                params: { user: JSON.stringify(currentUser) },
            })
        },
        {
            "label": "My Album", "name": "image", "color": "#89dd6a", "fill": '#ccc', onPress: () => router.push({
                pathname: 'album',
                params: { user: JSON.stringify(currentUser) },
            })
        },
        { "label": "My Video", "name": "video", "color": "#c382f5", "fill": '#ccc' },
        { "label": "Relationship", "name": "friends", "color": "#dd6a99", "fill": '#ccc', onPress: () => router.push('relationship') },
        { "label": "Chat", "name": "messages", "color": "#5591e7", "fill": '#ccc', onPress: () => router.push('conversations') },
        { "label": "Page", "name": "page", "color": "#b0caef", "fill": '#ccc' },
        { "label": "Group", "name": "group", "color": "#f39030", "fill": '#ccc' },
        { "label": "Storage", "name": "storage", "color": "#76f7db", "fill": '#ccc' },
        { "label": "Market", "name": "market", "color": "#fbbfab", "fill": '#ccc' },
        { "label": "Event", "name": "event", "color": "rgba(255,255,255,0.6)", "fill": 'white' },
        { "label": "Premium", "name": "premium", "color": "#e7ed11", "fill": '#ccc' },
        { "label": "Setting", "name": "setting", "color": "none", "fill": 'none' },
        { "label": "Logout", "name": "logout", "color": "#ff0000", "fill": '#ccc', onPress: () => submitLogout() },
    ];

    const onLogout = async () => {
        console.log("đến đây")
        try {
            await handleLogout();
            router.replace('/welcome');
        } catch (err) {
            console.log(err)
        }
    }
    const submitLogout = () => {
        Alert.alert('Confirm', "Are you sure you want to log out?", [
            {
                text: 'Cancel',
                onPress: () => {
                    console.log('modal canceled')
                },
                style: 'cancel'
            },
            {
                text: 'Logout',
                onPress: () => onLogout(),
                style: 'destructive'
            }
        ])
    }
    return (
        <SrceenWrapper >
            <View style={styles.header}>
                <View>
                    <Header title="Menu" showBackButton={true} />
                </View>
            </View >
            <View style={{ flex: 1, paddingBottom: 5 }}>
                <FlatList
                    data={defaultItems}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2} // 👉 Chia 2 cột
                    renderItem={({ item }) => (
                        <View style={{ flex: 1, margin: 5, marginBottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <ButtonIcon_ver2 size={wp(50) - 5} name={item.name} label={item.label} color={item.color} fill={item.fill} onPress={item.onPress} />
                        </View>
                    )}
                    contentContainerStyle={styles.container}
                />
            </View>
        </SrceenWrapper>
    )
}
export default MenuMore

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
})