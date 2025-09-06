import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp } from '../helpers/common'

const Conversations = () => {
  return (
    <SrceenWrapper >
    <View style={styles.header}>
        <View>
            <Header title="Coversations" showBackButton={true} />
        </View>
    </View >
</SrceenWrapper>
  )
}

export default Conversations

const styles = StyleSheet.create({
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