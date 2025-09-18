import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'

const Online = ({ username }) => {
    
    return (
        <View style={styles.status}>
            <Icon name='dot' color={theme.colors.mess} size={15} />
        </View>
    )
}

export default Online

const styles = StyleSheet.create({
    status: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.25,
        borderTopWidth: 0.25,
        borderColor: '#ccc',
        borderCurve: 'continuous',
    },
})