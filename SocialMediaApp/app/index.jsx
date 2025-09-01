import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import SrceenWrapper from '../components/SrceenWrapper';
const index = () => {
    const router = useRouter();
    return (
        <SrceenWrapper>
            <View>
                <Text>MMMM</Text>
                <Button title="welcome" onPress={() => router.push('welcome')} />
            </View>
        </SrceenWrapper>
    )
}

export default index