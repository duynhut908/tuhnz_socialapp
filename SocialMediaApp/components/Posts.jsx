import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { makeRequest } from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Post from "./Post";
import { posts } from "./test";


export default function FeedScreen({posts}) {
  const { currentUser } = useContext(AuthContext)
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ["posts", currentUser], queryFn: () =>
  //     makeRequest.get("/posts/").then((res) => {
       
  //       return res.data;
  //     })
  // })
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post data={item} />}
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