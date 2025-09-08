import Svg,{Circle, Path } from 'react-native-svg'
import React from 'react'

const Sticker = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={props.fill || "#000"} {...props}>
      <Circle cx="12" cy="12" r="10" stroke={props.color || "#000"}  strokeWidth={0.5} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M8 15C8.91212 16.2144 10.3643 17 12 17C13.6357 17 15.0879 16.2144 16 15" stroke={props.color || "#000"}  strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M8.00897 9L8 9M16 9L15.991 9"stroke={props.color || "#000"}  strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
)
export default Sticker

