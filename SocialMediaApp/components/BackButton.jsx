import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

const BackButton = ({ size = 35, router }) => {
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Icon name='arrowleft' strokeWidth={3} size={size} color="white" />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.sm,
  }
})