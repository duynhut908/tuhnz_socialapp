import Svg, { Circle, Path } from 'react-native-svg'
import React from 'react'

const Dot = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill={props.color || "#000"} {...props}>
    <Circle cx="12" cy="12" r="8" stroke={"#ccc"} strokeWidth={0.5} strokeLinecap="round" />
  </Svg>
)
export default Dot

