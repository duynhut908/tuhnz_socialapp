import { ActivityIndicator, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import SrceenWrapper from '../components/SrceenWrapper'
import { hp, wp } from '../helpers/common'
import { useRouter } from 'expo-router'
import { AuthContext } from '../context/AuthContext'
import Avatar from '../components/Avatar'
import Icon from '../assets/icons'
import { format } from 'date-fns/format'
import { parseISO } from 'date-fns/parseISO'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import { Check } from "lucide-react-native";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
import * as ImagePicker from 'expo-image-picker'
import { cloudinaryDeleteImage, cloudinaryUpload } from '../api/axiosUpload'
const editAvatar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [delImg, setDelImg] = useState(null)
  const router = useRouter();
  const deleteImageLink = async (publicId) => {
    try {
      const resourceType = 'image'
      const response = await cloudinaryDeleteImage(publicId, resourceType);
      if (response) console.log(response)

    } catch (error) {
      console.error('Error delete image in fontend:', error);
    } finally {
      router.back()
    }
  }
  const backSetAvatar = () => {
    if (!delImg) {
      router.back()
    }
    else { deleteImageLink(delImg) }
  }
  return (
    <SrceenWrapper>
      <View style={styles.header}>
        <View>
          <Header title="Edit Avatar" showBackButton={true} onBackPress={backSetAvatar} />
        </View>
      </View >
      <ManagerMyAvatar currentUser={currentUser} setCurrentUser={setCurrentUser} setDelImg={setDelImg} />
    </SrceenWrapper>
  )
}
const sizeOfItemAvatar = hp(9.5)
const sizeOfSelectedItemAvatar = hp(1.2)

const ManagerMyAvatar = ({ currentUser, setCurrentUser, setDelImg }) => {
  const router = useRouter()
  const [loading, setLoading] = useState()

  const { isLoading: il, error, data: listAvatars } = useQuery({
    queryKey: ["all-avatar", currentUser?.username], queryFn: () =>
      makeRequest.get("/users/all-avatar").then((res) => {
        return res.data;
      }),
    enabled: !!currentUser?.username,
  })
  const getAvatarById = (id) => {
    return listAvatars.find(item => item.id === id);
  };
  const [select, setSelect] = useState(listAvatars?.find(item => item.current === 1)?.id)
  const [avatarForm, setAvatarForm] = useState(currentUser?.pic_avatar)
  const [avatarUp, setAvatarUp] = useState(null)

  const [isSet, setIsSet] = useState(true)
  const [isNew, setIsNew] = useState(false)
  const [isSave, setIsSave] = useState(true)
  const [isDel, setIsDel] = useState(true)

  useEffect(() => {
    setDelImg(avatarUp?.publicId)
  }, [avatarUp])

  const uploadPicture = async (formData) => {
    if (loading) return;
    try {
      setLoading(true); // Bắt đầu hiển thị loading
      const response = await cloudinaryUpload(formData);

      setAvatarUp({ url: response.secure_url, publicId: response.publicId, type: response.type })
      setSelect(false)
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  }
  const onPick = async () => {
    setIsNew(true)

    let mediaConfig = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {

      setIsSet(false)
      setIsDel(false)
      setIsSave(false)
      const pickedFile = result.assets[0];

      // Tạo FormData
      const formData = new FormData();
      formData.append('file', {
        uri: pickedFile.uri,
        type: pickedFile.type === 'video' ? 'video/mp4' : 'image/jpeg',
        name: pickedFile.fileName || (pickedFile.type === 'video' ? 'video.mp4' : 'photo.jpg'),
      });

      uploadPicture(formData); // gửi FormData
    } else {
      setIsNew(false)
    }

  }
  const queryClient = useQueryClient()

  const mutationSetAvatar = useMutation({
    mutationFn: (data) => {

      if (avatarUp?.url === null) return;
      return makeRequest.post("/users/new-avatar", data);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?.username] });
      queryClient.invalidateQueries({ queryKey: ["all-avatar", currentUser?.username] });
      setCurrentUser(prev => ({
        ...prev,
        pic_avatar: avatarUp?.url
      }));
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  })
  const mutationUpdateAvatar = useMutation({
    mutationFn: (id) => {

      return makeRequest.put("/users/avatar-by-id", id);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?.username] });
      queryClient.invalidateQueries({ queryKey: ["all-avatar", currentUser?.username] });

      setCurrentUser(prev => ({
        ...prev,
        pic_avatar: getAvatarById(select)?.link !== currentUser?.pic_avatar ? getAvatarById(select)?.link : null
      }));
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  })
  const onSubmitSetAvatar = () => {
    if (select) {
      if (getAvatarById(select)?.link === currentUser?.pic_avatar) return;
      try {

        mutationUpdateAvatar.mutate({ id: select });
      } catch (error) {
        Alert.alert("Errol", error);
      } finally {
        setAvatarUp(null)
        //setSelect(false),
        setIsNew(false)
        setIsSet(true)
        setIsSave(false)
      }
    } else {
      try {
        mutationSetAvatar.mutate({ pic_avatar: avatarUp?.url ? avatarUp?.url : null });
      } catch (error) {
        Alert.alert("Errol", error);
      } finally {
        //setAvatarUp(null),
        setSelect(false)
        setIsNew(false)
        setIsSet(true)
        setIsDel(true)
      }
    }
  }
  const mutationAddAvatarTemp = useMutation({
    mutationFn: (data) => {
      if (avatarUp?.url === null) return;
      return makeRequest.post("/users/add-avatar-temp", data);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.invalidateQueries({ queryKey: ["all-avatar", currentUser?.username] });
      setCurrentUser(prev => ({
        ...prev,
        pic_avatar: currentUser?.pic_avatar
      }));
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  })
  const mutationUpdateAvatarTemp = useMutation({
    mutationFn: (id) => {
      if (select === null) return;
      return makeRequest.put("/users/avatar-temp", id);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?.username] });
      queryClient.invalidateQueries({ queryKey: ["all-avatar", currentUser?.username] });
      setCurrentUser(prev => ({
        ...prev,
        pic_avatar: null
      }));

    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  })
  const onSubmitSaveAvatar = () => {
    if (!select) {
      try {
        mutationAddAvatarTemp.mutate({ pic_avatar: avatarUp?.url ? avatarUp?.url : null });
      } catch (error) {
        Alert.alert("Errol", error);
      } finally {
        setAvatarUp(null)
        setSelect(false)
        setIsSave(true)
        setIsSet(true)
        setIsDel(true)
        setIsNew(false)
      }
    } else {
      try {
        mutationUpdateAvatarTemp.mutate({ id: select });
      } catch (error) {
        Alert.alert("Errol", error);
      } finally {
        //setAvatarUp(null),
        setSelect(false)
        setIsSave(true)
        setIsSet(true)
        setIsDel(true)
      }
    }
  }


  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (id) {

        return makeRequest.delete(`/users/deleteAvatar?id=${id}`);
      }
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?.username] });
      queryClient.invalidateQueries({ queryKey: ["all-avatar", currentUser?.username] });

      setCurrentUser(prev => ({
        ...prev,
        pic_avatar: getAvatarById(select)?.link !== currentUser?.pic_avatar ? currentUser?.pic_avatar : null
      }));
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  })
  const deleteImageLink = async ({ id, publicId }) => {
    if (id) {
      try {
        setLoading(true); // Bắt đầu hiển thị loading
        const resourceType = 'image'
        if (id) deleteMutation.mutate(id);

        const response = await cloudinaryDeleteImage(publicId, resourceType);
        if (response) setAvatarUp(null)

      } catch (error) {
        console.error('Error uploading image in fontend:', error);
      } finally {
        setLoading(false);
        setSelect(false);
        setIsSet(true)
        setIsDel(true)
        setIsNew(false)
      }
    } else {
      try {
        const resourceType = 'image'
        const response = await cloudinaryDeleteImage(publicId, resourceType);
        if (response) setAvatarUp(null)

      } catch (error) {
        console.error('Error uploading image in fontend:', error);
      }
    }
  }
  const onSubmitDeleteAvatar = () => {
    if (select) {
      const match = select ? getAvatarById(select)?.link.match(/uploads\/[^.]+/) : null;
      const result = match ? match[0] : null;
      deleteImageLink({ id: select, publicId: result })
    } else {
      const match = avatarUp ? avatarUp?.url.match(/uploads\/[^.]+/) : null;
      const result = match ? match[0] : null;
      deleteImageLink({ id: null, publicId: result })
    }
  }
  const selectAvatar = (id) => {
    if (avatarUp) {
      const match = avatarUp ? avatarUp?.url.match(/uploads\/[^.]+/) : null;
      const result = match ? match[0] : null;
      deleteImageLink({ id: null, publicId: result })
    }
    if (id !== listAvatars?.find(item => item.current === 1)?.id) {
      setSelect(id)
      setIsDel(false)
      setIsSet(false)
      setIsSave(true)
      setAvatarUp(null)
    }
    else {
      setSelect(id)
      setAvatarUp(null)
      setIsSet(true)
      setIsDel(false)
      setIsSave(false)
    }
  }
  return (
    <View style={styles.myProfileContainer}>
      <View style={styles.avatarEdit}>

        <Avatar size={hp(20)} link={avatarUp ? avatarUp?.url : select ? getAvatarById(select)?.link : currentUser?.pic_avatar} />
        {!loading ? <View style={styles.listInteractButton}>
          <View style={{ height: hp(6), width: hp(11.5), opacity: isSet ? 0.5 : 1 }}>
            <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
              title="Set ảnh" name='setImg' color='#00ff4f'
              disablePress={isSet}
              hasShadow={false}
              onPress={() => {
                onSubmitSetAvatar();
              }}
            />
          </View>
          <View style={{ height: hp(6), width: hp(11.5), opacity: isNew ? 0.5 : 1 }}>
            <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
              title="Ảnh mới" name='newImg' color='#b7e2ed'
              disablePress={isNew}
              hasShadow={false}
              onPress={() => {
                onPick();
              }}
            /></View>
          <View style={{ height: hp(6), width: hp(11.5), opacity: isSave ? 0.5 : 1 }}>
            <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
              title="Lưu ảnh" name='saveImg' color='#e7b861'
              disablePress={isSave}
              hasShadow={false}
              onPress={() => {
                onSubmitSaveAvatar();
              }}
            /></View>
          <View style={{ height: hp(6), width: hp(11.5), opacity: isDel ? 0.5 : 1 }}>
            <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
              title="Xóa ảnh" name='delImg' color='#fc4f4a'
              disablePress={isDel}
              hasShadow={false}
              onPress={() => {
                onSubmitDeleteAvatar();
              }}
            /></View>
        </View> : <View style={styles.loading}>
          <ActivityIndicator size='large' color='#00ff4f' />
        </View>}
      </View>
      {listAvatars?.length > 0 && <View style={{ paddingVertical: 10 }}
      >
        <Text style={styles.titleSelectOldAvatar}>Saved Avatar</Text>
        <ScrollView
          style={styles.listOldAvatar}
          contentContainerStyle={styles.listOldAvatarContent}
          showsHorizontalScrollIndicator={true}
        >
          {listAvatars.map((item, index) => {
            const selected = select === item.id;
            const isSetCur = currentUser?.pic_avatar === item.link;

            return (
              <TouchableOpacity key={item.id} style={[{
                height: sizeOfItemAvatar, width: sizeOfItemAvatar,
                alignSelf: "center",
                justifyContent: "center",
                borderRadius: sizeOfItemAvatar / 2,
              },
              selected && {
                borderWidth: 1.5,            // độ dày viền
                borderColor: "white",      // màu viền
              },]}
                onPress={() => {
                  { selectAvatar(item.id) }
                }}>
                <Avatar size={sizeOfItemAvatar - (selected ? sizeOfSelectedItemAvatar : 0)} link={item.link} />
                {isSetCur && <View style={[styles.checkMark, { bottom: -5 }]}>
                  <Check size={hp(1.8)} strokeWidth={5} color="green" />
                </View>}
              </TouchableOpacity>)
          })}

        </ScrollView>
      </View>}

    </View >
  )
}
export default editAvatar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: wp(4)
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
    height: hp(7),
    borderBottomWidth: 0.5,
    borderColor: '#c4d3d9',      // màu viền
    justifyContent: 'center'
  },
  myProfileContainer: {
    flex: 1,
    padding: 15,
  },
  avatarEdit: {
    flexDirection: 'row',
    alignItems: 'center',   // các con sẽ canh theo đáy phần tử cao nhất (avatar)
    justifyContent: 'center',// đưa cả nhóm ra giữa
    gap: 15,
    //flex: 1
  },
  avatarContainer: {
    alignSelf: 'left',
  },
  listInteractButton: {
    flex: 1,
    flexDirection: 'row',    // xếp theo hàng ngang
    flexWrap: 'wrap',        // cho phép xuống hàng
    justifyContent: 'space-between', // dàn đều 2 cột
    gap: 7,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleSelectOldAvatar: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.bold,
    color: '#d1f0f7',
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng   
    marginVertical: 10
  },
  listOldAvatar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    maxHeight: hp(30),
  },
  listOldAvatarContent: {
    gap: 10,            // khoảng cách giữa các phần tử
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 20
  },
  checkMark: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: hp(2),
    padding: 2,
    textShadowColor: 'rgba(0,0,0,1)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng   
  },
})