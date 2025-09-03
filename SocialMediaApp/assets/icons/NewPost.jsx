import Svg, { Path } from 'react-native-svg'
import React from 'react'

const NewPost = (props) => (
    // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
    //   <Path d="M19 18V9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5V18"  stroke={props.color || "#000"}  strokeWidth={props.strokeWidth}  strokeLinecap="round" strokeLinejoin="round"/>
    //   <Path d="M20.5 18H3.5"  stroke={props.color || "#000"}  strokeWidth={props.strokeWidth}  strokeLinecap="round" strokeLinejoin="round"/>
    //   <Path d="M13.5 20C13.5 20.8284 12.8284 21.5 12 21.5M10.5 20C10.5 20.8284 11.1716 21.5 12 21.5M12 21.5V20"  stroke={props.color || "#000"}  strokeWidth={props.strokeWidth}  strokeLinejoin="round"/>
    // </Svg>
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={24} height={24} fill={props.color || "#000"}  {...props}>
        <Path d="M83,10.9c-1.6,0.5-4,1.7-5.4,2.7C73.9,16.3,31.4,65.2,29.4,69c-2.9,5.8-2.8,3-2.8,75.4c0,63.3,0,66.2,0.9,68c1,2.2,2.6,3.8,4.5,4.5c0.9,0.4,14.3,0.5,41.8,0.5h40.4v-12.8v-12.8l-31.6-0.1c-31.1-0.1-31.6-0.1-32.9-1.1c-0.7-0.5-1.8-1.6-2.3-2.3c-1-1.3-1-1.6-1.1-54l-0.1-52.7l1-1.6c2.5-3.6,2.2-3.5,17.5-3.8c19.3-0.3,17.8,1.3,18.1-19.8c0.3-17.4,0.3-17.6,4.3-19.7l2.1-1h36.7h36.7l2.1,1c1.2,0.7,2.5,1.8,3.1,2.8c1,1.6,1,2.5,1.1,47.7l0.1,46.1h9.5h9.5l-0.1-59.2L187.7,15l-1.1-1.6c-0.6-0.9-2-2-3-2.5c-1.8-1-3-1-49.8-0.9C87.9,10,85.7,10.1,83,10.9z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
        <Path d="M67.7,98.3l0.1,8l39.6,0.1l39.6,0.1v-8.1v-8.1h-39.7H67.6L67.7,98.3z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
        <Path d="M67.6,128.2v7.9h39.7H147v-7.9v-7.9h-39.7H67.6V128.2z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
        <Path d="M160.8,162v16.9l-17.2,0.1l-17.3,0.1l-0.1,16.3l-0.1,16.3l17.2,0.1l17.3,0.1l0.1,17l0.1,17h16.9h16.9l0.1-17l0.1-17l17.3-0.1l17.2-0.1l-0.1-16.3l-0.1-16.3l-17.2-0.1l-17.3-0.1V162v-16.9h-16.9h-16.9V162z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
        <Path d="M67.6,158v8.1h39.7H147V158v-8.1h-39.7H67.6V158z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
    </Svg>
)
export default NewPost

