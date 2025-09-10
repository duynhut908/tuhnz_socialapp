import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Avatar from './Avatar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import moment from 'moment'
const sizeAvatar = hp(5.5)
const Comment = ({comment}) => {
    const { isLoading: isll, error: err, data: dataUserComment } = useQuery({
        queryKey: ["profile", comment?.username], queryFn: () =>
            makeRequest.get("/users/" + comment?.username).then((res) => {
                return res.data;
            })
    })
    return (
        <View style={styles.commentContainer}>
            <View style={styles.avatarCmt}>
                <Avatar size={sizeAvatar} link={dataUserComment?.pic_avatar}/>
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
        backgroundColor: '#e9e9e9',
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
        fontStyle:'italic'
    }
})