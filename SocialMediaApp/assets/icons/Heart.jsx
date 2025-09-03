import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Heart = (props) => (
  //   <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill={"none"} {...props}>
  //   <Path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z"   stroke={props.color || "#000"}  strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  // </Svg>
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={24} height={24} fill={props.color || "#000"} {...props}>
    <Path d="M59.5,28.9c-23.1,4-42,21.6-47.9,44.6c-1.6,6-2.1,16.9-1.2,23.3c1.4,9.6,6,20.5,12,28.2c1.3,1.7,24.6,25.3,51.9,52.5c53.8,53.7,50.5,50.8,55.8,49.8c1.8-0.3,7.7-6,52.6-50.9c44.1-44.2,50.9-51.2,53.7-55.5c6-9.3,9-18.7,9.5-29.8c0.4-8.6-0.4-14.4-2.9-22.1c-4.8-14.5-14.8-26.4-28.5-34c-15.6-8.6-37.1-9.3-53.5-1.6c-7.9,3.7-12.2,7-22.8,17.5L128,61L117.9,51c-5.8-5.7-11.9-11.1-14.1-12.6c-5.6-3.7-12.6-6.9-18.9-8.5C78.1,28.2,66.4,27.7,59.5,28.9z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinejoin="round" />
  </Svg>
)
export default Heart

