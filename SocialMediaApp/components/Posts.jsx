import {  FlatList, View, StyleSheet } from "react-native";
import APost from "./APost";
import { posts } from "./test";


export default function FeedScreen() {
    return (
        <View style={styles.container}>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.post.id}
            renderItem={({ item }) => <APost data={item} />}
            contentContainerStyle={{ padding: 12 }}
          />
        </View>
      ); 
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});