import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const APost = ({ data }) => {
  const { user, post } = data;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subText}>
            {user.location} · {post.time}
          </Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.body}>
        <Text style={styles.contentText}>{post.content}</Text>

        {post.listImage.map((img, idx) => (
          <Image key={idx} source={{ uri: img }} style={styles.postImage} />
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>👍 {post.countLike}</Text>
        <Text>💬 {post.countComment}</Text>
        <Text>↗️ {post.countShare}</Text>
      </View>
    </View>
  );
};

export default APost;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
  },
  subText: {
    color: "gray",
    fontSize: 12,
  },
  body: {
    marginTop: 10,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});
