import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';
import { SocketProvider } from '../context/SocketContext';


const queryClient = new QueryClient();
const _layout = () => {

    return (
        <AuthProvider>
            <SocketProvider>
                <QueryClientProvider client={queryClient}>
                    <Stack
                 initialRouteName="menumore" //chỉ set khác homeapp, set homeapp sẽ bị render 2 lần
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
            </SocketProvider>
        </AuthProvider>

    )
}

export default _layout