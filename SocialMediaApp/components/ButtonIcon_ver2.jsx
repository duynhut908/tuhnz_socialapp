import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { hp } from '../helpers/common'

const ButtonIcon_ver2 = ({ size, name, label, color, fill, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { height: size, width: size, justifyContent: 'center', alignItems: 'center' }]}>
            <Icon name={name} color={color} size={size / 2.5} strokeWidth={1.5} />
            <Text style={[styles.label, { color: color === 'none' ? '#ccc' : color}]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default ButtonIcon_ver2

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        borderWidth: 2,
        gap: 5
    },
    label: {
        fontSize: hp(2.4)
    }
})