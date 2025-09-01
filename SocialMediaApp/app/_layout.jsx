import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext';


const queryClient = new QueryClient();
const _layout = () => {
    
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <Stack
                    initialRouteName="profile"
                    screenOptions={{
                        headerShown: false
                    }}
                />
            </QueryClientProvider>
        </AuthProvider>

    )
}

export default _layout