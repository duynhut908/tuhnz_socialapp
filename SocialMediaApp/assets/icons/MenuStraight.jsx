import Svg, { Path, Rect } from 'react-native-svg'
import React from 'react'

const MenuStraight = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
        <Path d="M5 4 L5 20" stroke={props.color || "#000"} strokeWidth={props.strokeWidth ?? 2} strokeLinecap="round" />
        <Path d="M12 4 L12 20" stroke={props.color || "#000"} strokeWidth={props.strokeWidth ?? 2} strokeLinecap="round" />
        <Path d="M19 4 L19 20" stroke={props.color || "#000"} strokeWidth={props.strokeWidth ?? 2} strokeLinecap="round" />
    </Svg>
)
export default MenuStraight

