import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';


const queryClient = new QueryClient();
const _layout = () => {

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Stack
                initialRouteName="homeapp"
                    screenOptions={{

                        headerShown: false,
                        gestureEnabled: true,
                        animation: 'slide_from_right', // push/replace: phải sang trái
                        gestureDirection: 'horizontal', // back swipe: trái sang phải
                        detachPreviousScreen: false,        // native-stack option
                        detachInactiveScreens: false,       // react-navigation option
                    }}
                >
                    <Slot />
                </Stack>
            </QueryClientProvider>
        </AuthProvider>

    )
}

export default _layout