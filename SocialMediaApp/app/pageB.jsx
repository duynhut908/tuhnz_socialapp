// app/b.jsx
import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function PageB() {
  const router = useRouter();

  useEffect(() => {
    console.log('PageB mounted');
    return () => console.log('PageB unmounted');
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: '#ffdfe0' }]}>
      <Text style={styles.title}>Page B</Text>
      <Text style={{marginBottom:16}}>Swipe back or press Back button</Text>
      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  title: { fontSize:24, marginBottom:12 },
  btn: { padding:12, backgroundColor:'#ef4444', borderRadius:8 },
  btnText: { color:'white', fontWeight:'600' },
});
