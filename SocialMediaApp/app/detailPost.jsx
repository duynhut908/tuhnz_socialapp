import { ActivityIndicator, KeyboardAvoidingView, FlatList, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import Icon from '../assets/icons'
import Header from '../components/Header'
import { AuthContext } from '../context/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import Post from '../components/Post'
import Input_ver2 from '../components/Input_ver2'
import DropDownPicker from 'react-native-dropdown-picker'
import Comment from '../components/Comment'
import { useLocalSearchParams } from 'expo-router'

const PostDetail = ({ }) => {
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const note = JSON.parse(params.postParam);          // lấy giá trị note
    const postId = note?.id
    const { currentUser } = useContext(AuthContext)
    const { isLoading, error, data: post } = useQuery({
        queryKey: ["postDetail", postId], queryFn: () =>
            makeRequest.get("/posts/" + postId).then((res) => {
                return res.data;
            })
    })
    const { isLoading: isComment, error: isError, data: cmts } = useQuery({
        queryKey: ["comment", postId], queryFn: () =>
            makeRequest.get("/comments?postId=" + postId).then((res) => {
                return res.data;
            })
    })
    const [loading, setLoading] = useState(false);
    const onSubmit = () => {

    }
    const listcomment = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("newest");
    const [items, setItems] = useState([
        { label: "Mới nhất", value: "newest" },
        { label: "Cũ nhất", value: "oldest" },
        { label: "Tương tác nhiều nhất", value: "most" },
    ]);
    const [fixKeyboard, setFixKeyboard] = useState(0)
    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setFixKeyboard(hp(5) - 2);
            //setOpenSticker(false);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setFixKeyboard(0)
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return (
        <SrceenWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1, }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : fixKeyboard} // fix theo header
            >
                <UserHeader />
                {/* <ScrollView
                style={[{ flex: 1, paddingHorizontal: 10 }]}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 20, gap: 3 }}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
            >
                <Post data={post} />
                <View style={styles.upComment}>
                    <Input_ver2 containerStyles={{ flex: 1 }} />
                    {loading ?
                        <View style={[styles.commentButton]}>
                            <ActivityIndicator size='small' color={theme.colors.check} />
                        </View> :
                        <TouchableOpacity style={styles.postButton} onPress={onSubmit}>
                            <Icon name="send" size={35} color={theme.colors.mess} strokeWidth={0.5} />
                        </TouchableOpacity>}
                </View>
                <Comments commentsStyle={styles.commentsStyle} />
            </ScrollView> */}
                <View style={styles.body}>
                    <FlatList
                        data={cmts || []}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Comment comment={item} />}
                        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}

                        ListHeaderComponent={
                            <>
                                <View style={{ paddingHorizontal: 10 }}>
                                    <Post data={post} />
                                </View>


                                {/* Label "Bình luận" */}
                                {/* <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{
                                backgroundColor: "#222",
                                borderRadius: 10,
                                zIndex: 1000, // rất quan trọng
                            }}
                            dropDownContainerStyle={{
                                backgroundColor: "#333",
                                zIndex: 1000, // đè lên FlatList
                            }}
                            textStyle={{ color: "white", fontWeight: "bold" }}
                            placeholder="Chọn mục"
                            listMode="SCROLLVIEW" // đảm bảo scroll trong dropdown mượt
                        /> */}
                            </>
                        }
                        contentContainerStyle={{ paddingBottom: 5 }}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
                {/* Ô nhập comment */}
                <View style={styles.upComment}>
                    <Input_ver2 containerStyles={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', }} />
                    <View style={styles.commentButton}>
                        <TouchableOpacity
                          
                        >
                            <Icon
                                name="sticker"
                                size={32}
                                color={theme.colors.messWeight}
                                fill={theme.colors.primary}
                                strokeWidth={2}
                            />
                        </TouchableOpacity>
                    </View>
                    {loading ? (
                        <View style={styles.commentButton}>
                            <ActivityIndicator size="small" color={theme.colors.check} />
                        </View>
                    ) : (
                        <View style={styles.commentButton}>
                            <TouchableOpacity
                                onPress={onSubmit}
                            >
                                <Icon
                                    name="send"
                                    size={30}
                                    color={theme.colors.mess}
                                    strokeWidth={0.5}
                                />

                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </KeyboardAvoidingView>
        </SrceenWrapper>
    )
}

const UserHeader = ({ }) => {

    return (
        <View style={styles.header}>
            <View>
                <Header title="Post" showBackButton={true} />
                <TouchableOpacity style={styles.moreButton}>
                    <Icon name="more" color={theme.colors.gray} strokeWidth={1.5} />
                </TouchableOpacity>
            </View>
        </View >
    )
}
export default PostDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingHorizontal: wp(4)
    },
    header: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 5,
        height: hp(7),
        borderBottomWidth: 0.5,
        borderColor: '#c4d3d9',      // màu viền
        justifyContent: 'center'
    },
    moreButton: {
        position: 'absolute',
        right: 5,
        top: "50%",                   // đẩy nút xuống giữa
        transform: [{ translateY: -17 }],
        padding: 5,
        borderRadius: theme.radius.sm,
        //backgroundColor: 'rgba(0,0,0,0.5)'
    },
    upComment: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 15,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commentButton: {
        paddingVertical: 5,
        gap: 5
    },
    body: {
        flex: 1,
    }

})