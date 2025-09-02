import Svg, { Path, Rect } from 'react-native-svg'
import React from 'react'

const Menu = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
        <Path d="M4 5L20 5" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M4 12L20 12" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M4 19L20 19" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)
export default Menu

