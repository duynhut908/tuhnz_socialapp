import Svg, { Path, Rect } from 'react-native-svg'
import React from 'react'

const Market = (props) => (
    <Svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="32" height="32" viewBox="0 0 256 256" enableBackground="new 0 0 256 256" fill={props.fill||props.color} {...props}>
        <Path d="M62.2,21.8C60.9,23,48.6,34.1,34.9,46.6L10,69.2l0.3,3.3c2,17.7,12,30.3,27.3,34.5c5.1,1.4,18.5,1.4,23.5,0c7.5-2,14.1-6.3,18.4-11.7c4.1-5.3,8.6-16.3,8.6-21.1c0-2.6,1-1,1.6,2.8c1.3,7.7,5.3,15.7,10.4,20.8c7.5,7.6,18,11.1,30.8,10.4c15-0.9,25.2-7.2,31.5-19.8c2-4,4.3-11.6,4.3-14.1c0-2.7,0.9-1.1,1.6,2.6c1.3,7.6,5.3,15.8,10.4,20.9c7.4,7.5,18,11.1,30.8,10.3c9-0.6,15.7-2.9,22-7.6c7.2-5.5,12.9-16.8,14.2-28.1l0.3-3.3l-24.9-22.6c-13.7-12.5-26-23.6-27.3-24.8l-2.4-2.1H128H64.6L62.2,21.8z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M85.6,108.9c-9.4,8.8-21.3,13-36.7,13h-7.4v39v39h30.9h30.9V169v-30.9H128h24.7V169v30.9h30.9h30.9v-39v-39h-7.4c-15.2,0-26.8-4-36.3-12.6l-3.5-3.2l-3,2.8c-9.7,8.8-21.4,13.1-36.3,13.1c-14.5,0-26.5-4.2-35.8-12.6c-1.9-1.7-3.5-3.1-3.6-3.1C88.5,106.2,87.1,107.3,85.6,108.9z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M18.6,202.8l-8.5,8.5v12.5v12.5H128h117.9v-12.5v-12.5l-8.6-8.6c-4.7-4.7-8.8-8.5-9-8.5s-0.4,4.3-0.4,9.5v9.5H128H28.1v-9.5c0-5.3-0.2-9.5-0.4-9.5C27.4,194.2,23.4,198.1,18.6,202.8z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
)
export default Market

