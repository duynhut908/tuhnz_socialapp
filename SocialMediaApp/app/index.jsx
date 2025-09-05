import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { Redirect, useRouter } from "expo-router";
import SrceenWrapper from '../components/SrceenWrapper';
import { AuthContext } from '../context/AuthContext';
const index = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Redirect href="/welcome" />;
    } 

    return <Redirect href="/homeapp" />;
}

export default index