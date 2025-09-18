import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useRef } from 'react'
import Avatar from './Avatar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import moment from 'moment'
import Icon from '../assets/icons'
import { AuthContext } from '../context/AuthContext'
const sizeAvatar = hp(5.5)
const Comment = ({ comment }) => {
    const queryClient = useQueryClient()
    const { currentUser } = useContext(AuthContext)
    const { isLoading: isll, error: err, data: dataUserComment } = useQuery({
        queryKey: ["profile", comment?.username], queryFn: () =>
            makeRequest.get("/users/" + comment?.username).then((res) => {
                return res.data;
            })
    })
    const { isLoading, error, data: likes_cmt } = useQuery({
        queryKey: ["likes_comment", comment?.id], queryFn: () =>
            makeRequest.get("/comments/likes_comment?commentId=" + comment?.id).then((res) => {
                return res.data;
            }),
        enabled: !!comment?.id,
    })

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const likeMutation = useMutation({
        mutationFn: (liked) => {
            if (liked) {
                return makeRequest.delete(`/comments/likes_comment?commentId=${comment?.id}`);
            }
            return makeRequest.post("/comments/likes_comment", { commentId: comment?.id });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["likes_comment", comment?.id],
            });
        },
    });
    const handleLike = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 1.4,
                friction: 3,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 3,
                useNativeDriver: true
            })
        ]).start();
        const liked = likes_cmt?.includes(currentUser?.username)
        likeMutation.mutate(liked);
    }
    return (
        <View style={styles.commentContainer}>
            <View style={styles.avatarCmt}>
                <Avatar size={sizeAvatar} link={dataUserComment?.pic_avatar} />
            </View>
            <View style={styles.body}>
                <View style={styles.mainBody}>
                    <Text style={styles.name}>{dataUserComment?.name}</Text>
                    <Text style={styles.contentCmt}>{comment?.desc}</Text>
                </View>
                <View style={styles.overBody}>
                    <Text style={styles.momentTime}>{moment(comment?.createAt).fromNow()}</Text>
                    {/* <View style={styles.tool}>

                    </View> */}
                </View>
                <View>
                    <Pressable style={[styles.interact,{ backgroundColor: likes_cmt?.length && '#eee',}]} onPress={() => handleLike()}>
                        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                            <Icon name='heart' color={`${likes_cmt?.includes(currentUser?.username) ? 'red' : '#eee'}`} size={14} />
                        </Animated.View>
                        {likes_cmt?.length > 0 && <Text style={{ fontSize: 12, color: '#555' }}>{likes_cmt?.length}</Text>}
                        {/* <Text style={{ fontSize: 12, color: '#555' }}></Text>} */}
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({
    commentContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        gap: 8
    },
    avatarCmt: {
        height: sizeAvatar,
        width: sizeAvatar
    },
    body: {
        width: wp(100) - sizeAvatar - 28
    },
    mainBody: {
        width: '100%',
        padding: 6,
        paddingHorizontal: 13,
        gap: 3,
        backgroundColor: '#b8b8b8',
        borderRadius: 10
    },
    name: {
        fontSize: 13,
        fontWeight: theme.fonts.bold
    },
    contentCmt: {
        fontSize: 16,
        // textAlign: 'justify'
    },
    overBody: {
        padding: 3
    },
    momentTime: {
        color: theme.colors.batwhite,
        fontSize: 13,
        fontStyle: 'italic'
    },
    interact: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        padding: 2,
        paddingHorizontal: 5,
        backgroundColor: '#eee',
        borderRadius: 8,
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        right: 18,
        bottom: 13
    }
})