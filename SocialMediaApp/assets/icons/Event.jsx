import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Event = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="32" height="32" viewBox="0 0 256 256" fill={props.color}  {...props}>
    <Path d="M222.4,128c0-13,10.6-23.6,23.6-23.6V57.2c0-13-10.6-23.6-23.6-23.6H33.6c-13,0-23.5,10.6-23.5,23.6v47.2c13,0,23.5,10.6,23.5,23.6c0,13-10.5,23.6-23.6,23.6v47.2c0,13,10.6,23.6,23.6,23.6h188.8c13,0,23.6-10.6,23.6-23.6v-47.2C233,151.6,222.4,141,222.4,128z M170.2,184.6L128,157.5l-42.2,27.1L98.5,136l-38.8-31.7l50-3L128,54.9l18.2,46.6l50,2.9l-38.8,31.7L170.2,184.6z" fill={props.fill} stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)
export default Event

