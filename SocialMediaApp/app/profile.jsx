import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'expo-router';
import SrceenWrapper from '../components/SrceenWrapper';
import Header from '../components/Header';

const profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const router = useRouter()
  return (
    <SrceenWrapper>
      <UserHeader user={currentUser} router={router} />
    </SrceenWrapper>
  )
}


const UserHeader = ({ user, router }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <Header title="Profile" />
      </View>
    </View>
  )
}

export default profile


const styles = StyleSheet.create({})