import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp } from '../helpers/common'

const Input_ver2 = ({ name, value, size, onChangeText, color, containerStyles, icon, ...rest }) => {
    return (
        <View style={[styles.container, { borderColor: "white" }, containerStyles && containerStyles]}>
            {
                icon && icon
            }
            <TextInput
                style={{
                    flex: 1,
                    color: color ? color : theme.colors.textLight,
                    fontSize: size
                }}
                placeholderTextColor={'#9d9d9d'}
                value={value}
                onChangeText={(text) => onChangeText && onChangeText(name, text)}
                {...rest}
            />
        </View>
    )
}

export default Input_ver2

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.md,
        borderCurve: 'continuous',
        paddingHorizontal: 10,
        gap: 12,
    }
})