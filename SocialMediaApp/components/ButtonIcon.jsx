import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Loading from './Loading'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'
import Icon from '../assets/icons'

const ButtonIcon = ({ buttonStyle,
    textStyle,
    name,
    disablePress,
    color,
    title = '',
    onPress = () => { },
    loading = false,
    hasShadow = true,
}) => {

    const shadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4
    }

    if (loading) {
        return (
            <View style={[styles.button, buttonStyle, { backgroundColor: 'transparent' }]}>
                <Loading />
            </View>
        )
    }
    return (
        <TouchableOpacity disabled={disablePress} onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle,]}>
            <Icon name={name} color={color} />
            <Text style={[styles.text, textStyle, { color: color }]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonIcon

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: hp(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xs,
        flexDirection: 'row',
        gap: 5,
    },
    text: {
        fontSize: hp(1.5),
        fontWeight: theme.fonts.bold,
        textShadowColor: 'rgba(256,256,256,0.2)', // màu bóng
        textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
        textShadowRadius: 2, // độ mờ bóng
    }
})