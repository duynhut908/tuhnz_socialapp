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
                       // presentation: "containedTransparentModal",
                        animation: "slide_from_right",
                    }} 
                    
                >
                    
                      <Slot />
                </Stack>
            </QueryClientProvider>
        </AuthProvider>

    )
}

export default _layout