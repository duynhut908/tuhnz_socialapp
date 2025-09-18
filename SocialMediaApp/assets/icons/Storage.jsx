import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Storage = (props) => (

  <Svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="24" height="24" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" fill={props.fill || props.color || "white"} {...props}>
    <Path d="M240.8,53.8L190.4,13c-2.7-2.1-5.9-3.1-9.2-2.9H29.3C18.6,10,10,18.7,10,29.3v197.4c0,10.6,8.6,19.3,19.3,19.3h197.4c10.6,0,19.3-8.6,19.3-19.3c0,0,0-162,0-162.1C246,60.2,244,56.3,240.8,53.8z M191.7,211.8H46v-53.1c0-10.6,8.6-19.3,19.3-19.3h107.2c10.6,0,19.3,8.6,19.3,19.3V211.8L191.7,211.8z M191.7,82.8c0,10.6-8.6,19.3-19.3,19.3H65.3c-10.6,0-19.3-8.6-19.3-19.3V29.7h145.7V82.8L191.7,82.8z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
  </Svg>
)
export default Storage

