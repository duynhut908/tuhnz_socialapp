import Svg,{Path } from 'react-native-svg'
import React from 'react'

const Notify = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
      <Path d="M19 18V9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5V18"  stroke={props.color || "#000"}  strokeWidth={props.strokeWidth}  strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M20.5 18H3.5"  stroke={props.color || "#000"}  strokeWidth={props.strokeWidth}  strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M13.5 20C13.5 20.8284 12.8284 21.5 12 21.5M10.5 20C10.5 20.8284 11.1716 21.5 12 21.5M12 21.5V20"  stroke={props.color || "#000"}  strokeWidth={props.strokeWidth}  strokeLinejoin="round"/>
    </Svg>
)
export default Notify

