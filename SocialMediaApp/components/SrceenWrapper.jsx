import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'expo-router';
const SrceenWrapper = ({ children, bg }) => {

    const { top, bottom } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 5 : 1000;
    const paddingBottom = bottom > 0 ? bottom + 5 : 10;

    return (
        <View style={{ flex: 1, paddingTop, paddingBottom, backgroundColor: 'bg' }}>
            <ImageBackground
                source={require('../assets/images/backgroudWelcom.jpg')}
                style={{ flex: 1 }}
                resizeMode="cover"
            >

                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.5)', // darken ảnh
                }} />
                {
                    children
                }
            </ImageBackground>
        </View>
    )
}

export default SrceenWrapper