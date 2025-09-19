import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import Header from '../components/Header'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useIsFocused } from '@react-navigation/native'
import { hp, wp } from '../helpers/common'
import VideoDiv from '../components/VideoDiv'
import Picture from '../components/Picture'
import { useQueryClient } from '@tanstack/react-query'

const albumList = () => {
    const router = useRouter();
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const note = JSON.parse(params.user);          // lấy giá trị note
    const nameAlbum = params.name;

    const queryClient = useQueryClient();
    const [data, setData] = useState(null)
    useEffect(() => {
        setData(nameAlbum === "MY AVATAR" ? queryClient.getQueryData(["all-avatar", note?.username]) : queryClient.getQueryData(["pictureOfUser", note?.username]))
    }, [nameAlbum])
    return (
        <SrceenWrapper >
            <View style={styles.header}>
                <View>
                    <Header title={nameAlbum} showBackButton={true} />
                </View>
            </View >
            <ListAlbum data={data} />
        </SrceenWrapper>
    )
}
const maxDisplay = 3
const sizePic = wp(30)
const ListAlbum = ({ user, router, data, time }) => {
    const displayImages = Array.from({ length: Math.min(data?.length, maxDisplay) });
    const isFocused = useIsFocused();
    return (
        <View style={{ gap: 15, flex: 1, paddingVertical: 10 }}>
            <View style={{ paddingHorizontal: 10 }}>
                <FlatList
                    data={data}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ gap: 2.5 }}   // khoảng cách ngang giữa các cột
                    ItemSeparatorComponent={() => <View style={{ height: 2.5 }} />} // khoảng cách dọc giữa các hàng
                    renderItem={({ item }) => {

                        return (
                            <View style={styles.gridImage}>
                                {
                                    item.type === 'image' ? (
                                        <Picture size={sizePic} link={item.link} />
                                    ) : item.type === 'video' ? (
                                        <VideoDiv item={item} isFocused={isFocused} />
                                    ) : (
                                        <Picture size={sizePic} link={item.link} />
                                    )
                                }
                            </View>
                        )
                    }}
                />
            </View>
        </View >
    )
}
export default albumList

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
    gridImage: {
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
    },
})