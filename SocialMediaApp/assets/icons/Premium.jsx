import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Premium = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="32" height="32" viewBox="0 0 256 256" fill={props.fill || 'yellow'} {...props}>
    <Path d="M212.9,40.9c-1.6-5.9-6.1-8.5-12.1-7.6c-6.6,1-9.7,5.2-9.1,11.8c0.2,3,0.8,5.7-2.5,7.7c-11,6.6-21.9,13.4-32.8,20.1c-4.7-5.9-9.3-12-14.2-17.7c-3.9-4.6-7.7-8.5-3.6-15.3c2.5-4.1-0.2-8.4-3.8-11.2c-3.7-2.9-7.8-3.3-12-0.7c-4.1,2.5-7,7-5,10.8c4.8,8.8-1.4,13.2-5.7,18.7c-3.9,4.9-7.8,9.8-11.7,14.7l0,0l0,0C87.2,67.9,77.5,58,65.8,51.5c-2.7-1.5-1.6-3.9-1.4-6.1c0.4-7.1-3.1-11.5-10-12.3c-6-0.7-10.4,2.4-11.4,8.5c-1.2,6.9,1.7,11.9,8.8,13c4.5,0.7,5.9,3,7,6.9c3.6,12.7,7.7,25.2,11.1,37.9c1.2,4.5,2.7,6.7,7.8,6.6c16.2-0.4,32.4-0.4,48.5-0.6c17.8,0.2,35.6,0.1,53.3,0.7c5.3,0.2,6.8-2.5,7.9-6.6c3.4-12.4,6.9-24.7,10.5-37c1.1-3.7,2-7.1,7.1-8.1C211.7,52.9,214.7,47.7,212.9,40.9L212.9,40.9z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M52.4,185.7l-19.3-54H10v5.4l37,92.5h11.6l38.2-91.8v-6.2H72.9L52.4,185.7z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M142.3,154.1h10v-22.4h-44.3v22.4h11.2v53.2h-11.2v22.4h46.3v-22l-11.9-0.8V154.1L142.3,154.1z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M222.5,131.7H175v97.9h22v-24.3l23.5-1.2c0,0,25.5-4.2,25.5-36.6S222.5,131.7,222.5,131.7L222.5,131.7z M216.3,180.7h-18.1v-26.2h17c0,0,8.9,3.5,8.9,13.1C224,177.3,216.3,180.7,216.3,180.7L216.3,180.7z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)
export default Premium

