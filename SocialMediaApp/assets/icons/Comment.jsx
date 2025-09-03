import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Comment = (props) => (
  //   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
  //   <Path d="M2 10.5C2 5.5 6 3 12 3C18 3 22 5.5 22 10.5C22 15.5 18 18 12 18V21C12 21 2 18 2 10.5Z"   stroke={props.color || "#000"}  strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  //   <Path d="M8 8.5H16M8 12.5H12"   stroke={props.color || "#000"}  strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  // </Svg>
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={24} height={24} fill={props.color || "#000"}  {...props}>
    <Path d="M16.4,32.3c-8.5,8.5-8.5,144.6,0,153.2c3.5,3.5,14.5,6,24.5,6c18,0,19,1,20.5,18.5c1,10,4,19,7.5,20c3.5,1.5,16-7,28-18l22-20.5h57.6c37.5,0,59.1-2,63.1-6c8.5-8.5,8.5-144.7,0-153.2C231.1,23.7,24.9,23.7,16.4,32.3z M94.5,112.8c2,10-12.5,17-20,9.5c-7.5-7.5-0.5-22,9.5-20C89,103.3,93.5,107.8,94.5,112.8z M139.5,112.8c2,10-12.5,17-20,9.5c-7.5-7.5-0.5-22,9.5-20C134,103.3,138.5,107.8,139.5,112.8z M184.6,112.8c2,10-12.5,17-20,9.5c-7.5-7.5-0.5-22,9.5-20C179.1,103.3,183.6,107.8,184.6,112.8z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
  </Svg>
)
export default Comment

