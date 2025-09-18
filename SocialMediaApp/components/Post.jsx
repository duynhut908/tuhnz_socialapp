import { View, Text, Image, StyleSheet, Pressable, useWindowDimensions, Animated, TouchableOpacity, Alert, FlatList } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Video } from 'expo-av';
import { VideoFullscreenUpdate } from 'expo-av';
import moment from 'moment'
import { makeRequest } from "../api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Avatar from "./Avatar";
import { hp, wp } from "../helpers/common";
import Picture from "./Picture";
import { Ionicons } from "@expo/vector-icons";
// import VideoPlayer from 'react-native-video-controls';
import VideoPlayer from 'expo-video-player';
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Icon from "../assets/icons";
import RenderHtml from 'react-native-render-html';
import { useRouter } from "expo-router";
import { AuthContext } from "../context/AuthContext";
import { theme } from "../constants/theme";
const Post = ({ data, nagiv = true }) => {
  const { isLoading: isImg, error: errImg, data: datImg } = useQuery({
    queryKey: ["imgs", data?.id], queryFn: () =>
      makeRequest.get("/posts/images/" + data?.id).then((res) => {
        return res.data;
      })
  })

  const { isLoading: islike, error: errlike, data: dataLike } = useQuery({
    queryKey: ["like", data?.id], queryFn: () =>
      makeRequest.get("/likes?postId=" + data?.id).then((res) => {
        return res.data;
      })
  })
  const { isLoading: isComment, error: isError, data: cmts } = useQuery({
    queryKey: ["comment", data?.id], queryFn: () =>
      makeRequest.get("/comments?postId=" + data?.id).then((res) => {
        return res.data;
      })
  })
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { currentUser } = useContext(AuthContext)
  const queryClient = useQueryClient()
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const handleLike = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.4,
        friction: 3,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true
      })
    ]).start();
    const liked = dataLike?.includes(currentUser?.username)
    likeMutation.mutate(liked);
  }
  const likeMutation = useMutation({
    mutationFn: (liked) => {
      if (liked) {
        return makeRequest.delete(`/likes?postId=${data?.id}`);
      }
      return makeRequest.post("/likes", { postId: data?.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like", data?.id],
      });
    },
  });
  const handleToDetailPost = () => {
    if (nagiv) router.push({
      pathname: 'detailPost',
      params: { postParam: JSON.stringify({ id: data?.id }) },
    });
  }
  const deletePostMutation = useMutation({
    mutationFn: () => {
      if (data) {
        return makeRequest.delete("/posts/delete", { data })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", currentUser]
      });

      if (!nagiv) router.back()
    }
  })
  const handleDeletePost = () => {

    if (data) {
      Alert.alert('Confirm', "Are you sure you want to delete this post?", [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('canceled delete post');
            setOpenMore((prev) => !prev)
          },
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deletePostMutation.mutate(),
          style: 'destructive'
        }
      ])
    }
  }

  const { isLoading: isReport, error: errReport, data: report } = useQuery({
    queryKey: ["report", data?.id], queryFn: () =>
      makeRequest.get("/posts/report/" + data?.id).then((res) => {
        return res.data;
      })
  })
  const reportPostMutation = useMutation({
    mutationFn: () => {
      if (data) {
        return makeRequest.post("/posts/report", data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", currentUser]
      });
      setOpenMore((prev) => !prev)
      if (!nagiv) router.back()
    }
  })
  const handleReportPost = () => {
    if (data && !report?.some(rep => rep?.username_report === currentUser?.username)) {
      Alert.alert('Confirm', "Are you sure you want to report this post?", [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('canceled report post');
            setOpenMore((prev) => !prev)
          },
          style: 'cancel'
        },
        {
          text: 'Report',
          onPress: () => reportPostMutation.mutate(),
          style: 'destructive'
        }
      ])
    }
    else {
      Alert.alert('You reported this post!')
      setOpenMore((prev) => !prev)
    }
  }
  const [openMore, setOpenMore] = useState(false)
  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable style={styles.header} onPress={() => router.push({
        pathname: 'profile',
        params: { user: JSON.stringify(data) },
      })}>
        <Avatar size={hp(5)} link={data?.avatar} />
        <View style={{ marginHorizontal: 10, flex: 1 }}>
          <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{data?.name}</Text>
          <Text style={styles.subText}>
            {moment(data?.createAt).fromNow()}
          </Text>
        </View>
        <TouchableOpacity style={{ justifyContent: 'flex-start', alignItems: 'center', width: wp(8) }} onPress={() => setOpenMore((prev) => !prev)}>
          <Icon name={openMore ? 'return' : 'more'} color={'#888'} size={25} />
        </TouchableOpacity>

      </Pressable>
      {/* Content */}
      <View style={styles.body}>
        <Pressable style={{
          padding: 0,      // padding toàn bộ
          margin: 0,        // bỏ margin mặc định
        }} onPress={() => handleToDetailPost()}>
          <RenderHtml
            tagsStyles={{
              body: {
                fontSize: 17,     // chỉnh size chữ
                padding: 0,      // padding toàn bộ
                margin: 0,        // bỏ margin mặc định
              },
            }}
            contentWidth={width}
            source={{ html: data?.desc }}
          />
        </Pressable>
        {datImg?.length > 0 && <PictureInPost dataImg={datImg} handleToDetailPost={handleToDetailPost} nagiv={nagiv} />}
        {
          openMore && (
            <>
              {data?.username === currentUser?.username ?
                < View style={styles.coverbody} >
                  < TouchableOpacity style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleDeletePost()}>
                    <Icon name='delete' size={30} color='red' />
                    <Text style={{ fontSize: 18 }}>Delete</Text>
                  </TouchableOpacity>
                </View> :
                < View style={styles.coverbody} onPress={() => handleReportPost()}>
                  < TouchableOpacity style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', alignItems: 'center' }} onPress={() => handleReportPost()}>
                    <Icon name='report' size={30} color='blue' />
                    <Text style={{ fontSize: 18 }}>Report</Text>
                  </TouchableOpacity>
                </View>
              }
            </>
          )
        }
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconInPost}>
          <Pressable onPress={handleLike}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Icon name='heart' color={`${dataLike?.includes(currentUser?.username) ? 'red' : 'white'}`} size='20' />
            </Animated.View>
          </Pressable>
          <Text>{dataLike?.length}</Text>
        </View>
        <View style={styles.iconInPost}>
          <Pressable onPress={() => handleToDetailPost()}>
            <Icon name='comment' color='#ccc' size='20' />
          </Pressable>
          <Text>{cmts?.length}</Text>
        </View>
        <View style={styles.iconInPost}>
          <Pressable>
            <Icon name='share' color='#84dcfc' size='20' />
          </Pressable>
          <Text>150</Text>
        </View>
      </View>
    </View >
  );
};
const maxDisplay = 3;
const sizePic = wp(27)
const PictureInPost = ({ user, router, dataImg, handleToDetailPost, nagiv }) => {
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
      {nagiv ? (<View style={styles.someImage}>
        {displayImages.map((_, index) => {
          const img = dataImg[index];
          const isLast = index === maxDisplay - 1 && dataImg.length > maxDisplay;
          const [isFullscreen, setIsFullscreen] = useState(false);
          return (
            <View key={index} style={styles.oneImage}>

              {img.type === 'image' ? <Picture size={sizePic} link={img.link} /> :
                img.type === 'video' ?
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
                <TouchableOpacity style={styles.plusOverlay} onPress={() => handleToDetailPost()}>
                  <Text style={styles.plusText}>+{dataImg.length - maxDisplay}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>) : (
        <View style={{ paddingHorizontal: 10 }}>
          <FlatList
            data={dataImg}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={{ gap: 2.5 }}   // khoảng cách ngang giữa các cột
            ItemSeparatorComponent={() => <View style={{ height: 2.5 }} />} // khoảng cách dọc giữa các hàng
            renderItem={({ item }) => (
              <View style={styles.gridImage}>
                {
                  item.type === 'image' ? (
                    <Picture size={sizePic} link={item.link} />
                  ) : item.type === 'video' ? (
                    <VideoPlayer
                      videoProps={{
                        ref: videoRef,
                        shouldPlay: false,
                        source: { uri: item.link },
                        isLooping: true,
                        resizeMode: 'cover',
                      }}
                      style={{ height: sizePic, width: sizePic, borderRadius: 8 }}
                    />
                  ) : (
                    <Text>Không định dạng được</Text>
                  )
                }
              </View>
            )
            }
          />
        </View>

      )
      }
    </View >
  )
}

const MoreInteract = () => {
  return (
    <View>

    </View>
  )
}
export default Post;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
    paddingBottom: 5,
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
    fontWeight: theme.fonts.bold,
    fontSize: 16,
  },
  subText: {
    color: "gray",
    fontSize: 12,
  },
  body: {
    marginVertical: 10,
    gap: 10,
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
    paddingVertical: 8,
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
  gridImage: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',

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
  moreInteract: {
    position: 'absolute',
    width: hp(8),
    height: hp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    right: 24,
    top: 40,
    borderRadius: theme.radius.sm,
    borderTopRightRadius: 0,
    borderColor: '#ccc',
    borderWidth: 1,
    borderCurve: 'continuous',
    zIndex: 1000,
    elevation: 1000
  },
  coverbody: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 50,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: theme.radius.sm,
    borderColor: '#ccc',
    borderWidth: 1,
    borderCurve: 'continuous',
    zIndex: 1000,
    elevation: 1000
  }
});
