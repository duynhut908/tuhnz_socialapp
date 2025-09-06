import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RadioButton from './RadioButton';

const GenderRadio = ({ value, onChange }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RadioButton
          label="Nam"
          selected={value === 1}
          onPress={() => onChange(1)}
        />
        <RadioButton
          label="Nữ"
          selected={value === 0}
          onPress={() => onChange(0)}
        />
      </View>
    );
  };
export default GenderRadio

const styles = StyleSheet.create({})