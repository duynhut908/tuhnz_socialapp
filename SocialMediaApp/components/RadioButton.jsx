import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const RadioButton = ({ label, selected, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}
        >
            <View
                style={{
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    borderWidth: 2,
                    borderColor: '#46c9e9',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 6,
                }}
            >
                {selected && (
                    <View
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: '#46c9e9',
                        }}
                    />
                )}
            </View>
            <Text style={{ color: '#d1f0f7' }}>{label}</Text>
        </Pressable>
    );
};

export default RadioButton

const styles = StyleSheet.create({})