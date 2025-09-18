import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Micro = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={props.fill || "#000"} {...props}>
    <Path d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" />
    <Path d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" />
  </Svg>
)
export default Micro

