import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Video } from 'expo-av';
import { VideoFullscreenUpdate } from 'expo-av';
import moment from 'moment'
import { makeRequest } from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import Avatar from "./Avatar";
import { hp } from "../helpers/common";
import Picture from "./Picture";
import { Ionicons } from "@expo/vector-icons";
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'expo-video-player';
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Icon from "../assets/icons";
import RenderHtml from 'react-native-render-html';
const Post = ({ data }) => {
  const { isLoading: isImg, error: errImg, data: datImg } = useQuery({
    queryKey: ["imgs", data?.id], queryFn: () =>
      makeRequest.get("/posts/images/" + data?.id).then((res) => {
        return res.data;
      })
  })
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Avatar size={hp(5)} link={data?.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{data?.name}</Text>
          <Text style={styles.subText}>
            {moment(data?.createAt).fromNow()}
          </Text>
        </View>
      </View>
      {/* Content */}
      <View style={styles.body}>
        <RenderHtml
          tagsStyles={{
            body: {
              fontSize: 14.5,     // chỉnh size chữ
              padding: 0,      // padding toàn bộ
              margin: 0,        // bỏ margin mặc định
            },
          }}
          contentWidth={width}
          source={{ html: data?.desc }}
        />

        {datImg?.length > 0 && <PictureInPost dataImg={datImg} />}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconInPost}>
          <Pressable>
            <Icon name='heart' color='red' size='20' />
          </Pressable>
          <Text>150</Text>
        </View>
        <View style={styles.iconInPost}>
          <Pressable>
            <Icon name='comment' color='#ccc' size='20' />
          </Pressable>
          <Text>150</Text>
        </View>
        <View style={styles.iconInPost}>
          <Pressable>
            <Icon name='share' color='#84dcfc' size='20' />
          </Pressable>
          <Text>150</Text>
        </View>
      </View>
    </View>
  );
};
const maxDisplay = 3;
const sizePic = hp(13.5)
const PictureInPost = ({ user, router, dataImg }) => {
  const videoRef = useRef(null);
  // const [isFullscreen, setIsFullscreen] = useState(false);
  // let lastTap = null;

  // const handleDoubleTap = async () => {
  //   const now = Date.now();
  //   if (lastTap && now - lastTap < 300) {
  //     // double tap
  //     if (isFullscreen) {
  //       await videoRef.current.dismissFullscreenPlayer();
  //       setIsFullscreen(false);
  //     } else {
  //       await videoRef.current.presentFullscreenPlayer();
  //       setIsFullscreen(true);
  //     }
  //   }
  //   lastTap = now;
  // };
  // const onLongPress = async () => {
  //   Alert.alert("Long Press", "Bạn giữ lâu trên video");
  //   await videoRef.current.presentFullscreenPlayer();
  // };
  const displayImages = Array.from({ length: Math.min(dataImg.length, maxDisplay) });

  return (
    <View style={{ gap: 15 }}>
      <View style={styles.someImage}>
        {displayImages.map((_, index) => {
          const img = dataImg[index];
          const isLast = index === maxDisplay - 1 && dataImg.length > maxDisplay;
          const [isFullscreen, setIsFullscreen] = useState(false);
          return (
            <View key={index} style={styles.oneImage}>

              {img.type === 'image' ? <Picture size={sizePic} link={img.link} /> :
                img.type === 'video' ?
                  // <Video
                  //   //ref={videoRef}
                  //   style={{ flex: 1, height: sizePic, width: sizePic, borderRadius: 8, }}
                  //   source={{ uri: img.link }}
                  //   useNativeControls
                  //   resizeMode='cover'
                  //   isLooping
                  // /> : 
                  // <VideoPlayer
                  //   source={{ uri: img.link }}
                  //   style={{ height: sizePic, width: sizePic, borderRadius: 8,}}
                  //   resizeMode="cover"
                  //   repeat={true}           // thay cho isLooping
                  //   disableBack={true}      // ẩn nút back mặc định
                  //   disableVolume={true}    // có thể tắt nút volume nếu muốn
                  //   disableFullscreen={false} // giữ nút fullscreen
                  //   showOnStart={false}     // ẩn control khi load
                  // /> :
                  <VideoPlayer
                    videoProps={{
                      ref: videoRef,
                      shouldPlay: false,
                      source: { uri: img.link },
                      isLooping: true,
                      resizeMode: isFullscreen ? 'contain' : 'cover'
                    }}
                    slider={sizePic < 200 ? false : true}
                    style={{ height: sizePic, width: sizePic, borderRadius: 8 }}
                    fullscreen={{
                      enterFullscreen: async () => {
                        if (videoRef.current) {
                          setIsFullscreen(true);
                          await videoRef.current.presentFullscreenPlayer();
                        }
                      },
                      exitFullscreen: async () => {
                        if (videoRef.current) {
                          await videoRef.current.dismissFullscreenPlayer();
                          setIsFullscreen(false);
                        }
                      },
                    }}
                    icon={{
                      play: (
                        <Ionicons
                          name="play"
                          size={sizePic < 200 ? 30 : 40}
                          color="white"
                        />
                      ),
                      pause: (
                        <Ionicons
                          name="pause"
                          size={sizePic < 200 ? 30 : 40}
                          color="white"
                        />
                      ),
                    }}
                  /> :
                  <Text>Không định dạng được</Text>
              }
              {isLast && (
                <View style={styles.plusOverlay}>
                  <Text style={styles.plusText}>+{dataImg.length - maxDisplay}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  )
}
export default Post;

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
    marginVertical: 10,
    gap: 10
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
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    height: hp(5)
  },
  iconInPost: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  someImage: {
    flexDirection: 'row',
    height: sizePic,
    marginHorizontal: 10,
    gap: 2.5
  },
  oneImage: {
    height: sizePic,
    width: sizePic,
    position: 'relative',
    borderRadius: 8,
  },
  plusOverlay: {
    ...StyleSheet.absoluteFillObject, // phủ toàn bộ view
    backgroundColor: 'rgba(0,0,0,0.5)', // nền bán trong suốt
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  plusText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
});
