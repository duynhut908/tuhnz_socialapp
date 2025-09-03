import Svg, { Path } from 'react-native-svg'
import React from 'react'

const Home = (props) => (
    // <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="none" {...props}>
    //     <Path d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    //     <Path d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    // </Svg>

    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={24} height={24} fill={props.color || "#000"}  {...props}>
        <Path d="M123.3,22.7c-2.8,1.5-111.1,110-112.4,112.5c-2.3,5-0.2,11.4,4.7,14.4c2.6,1.6,3,1.7,10.4,1.8l7.7,0.2v41.3v41.3h17.5h17.5v-29.7v-29.7h18h18v29.7v29.7h58.8h58.8v-41.3v-41.3l7.7-0.2c7.1-0.2,7.8-0.3,10.2-1.7c4.6-2.7,6.8-8,5.4-13.1c-0.6-2.2-2.1-4-12-13.9l-11.3-11.4v-27v-27h-17.5h-17.5v9.2c0,5-0.2,9.2-0.4,9.2c-0.2,0-12-11.6-26.2-25.8c-14.2-14.2-26.7-26.3-27.8-26.9C130.4,21.6,125.7,21.4,123.3,22.7z M199,169.3V187h-29.7h-29.7v-17.7v-17.7h29.7H199L199,169.3L199,169.3z" stroke={props.color || "#000"} strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

    </Svg>
)
export default Home

