import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'
import { theme } from '../constants/theme'
import Header from '../components/Header'
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router';
import Icon from '../assets/icons'
import Picture from '../components/Picture'
import Posts from '../components/Posts'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import { AuthContext } from '../context/AuthContext'

const myPosts = ({ }) => {
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const note = JSON.parse(params.user);          // lấy giá trị note
    console.log(params)
    const { isLoading, error, data } = useQuery({
        queryKey: ["myPost", note?.username], queryFn: () =>
            makeRequest.get("/posts/myPost/" + note?.username).then((res) => {

                return res.data;
            })
    })
    return (
        <SrceenWrapper>
                <View style={styles.header}>
                    <View>
                        <Header title="My Posts" showBackButton={true} />
                    </View>
                </View >
                <View style={styles.body}>

                    <Posts posts={data} />

                </View>
        </SrceenWrapper>
    )
}

export default myPosts

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
    body: {
        flex: 1,
    },
})