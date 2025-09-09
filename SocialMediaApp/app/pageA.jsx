// app/index.jsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import GifImage from 'react-native-gif';

export default function PageA() {
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: '#dfe7ff' }]}>
      <Text style={styles.title}>Page A</Text>
      <Pressable style={styles.btn} onPress={() => router.push('/pageB')}>
        <Text style={styles.btnText}>Go to B</Text>
      </Pressable>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  btn: { padding: 12, backgroundColor: '#3b82f6', borderRadius: 8 },
  btnText: { color: 'white', fontWeight: '600' },
});
