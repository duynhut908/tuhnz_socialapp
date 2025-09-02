import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import SrceenWrapper from '../components/SrceenWrapper';
import Header from '../components/Header';
import { hp } from '../helpers/common';

const newPost = () => {
    const router = useRouter();
    const params = useLocalSearchParams(); // trả về object chứa tất cả params
    const note = params.user;          // lấy giá trị note
    return (
        <SrceenWrapper>
            <ImageBackground
                source={require('../assets/images/backgroudWelcom.jpg')}
                style={styles.container}
                resizeMode="cover"
            >

                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.5)', // darken ảnh
                }} />

                <View style={styles.header}>
                    <View>
                        <Header title="New Post" showBackButton={true} />
                    </View>
                </View >
                <ScrollView contentContainerStyle={{ gap: 20 }}>
                    
                </ScrollView>
            </ImageBackground>
        </SrceenWrapper>
    )
}

export default newPost

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
})