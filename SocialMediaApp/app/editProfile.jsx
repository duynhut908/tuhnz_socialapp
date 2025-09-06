import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
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
import Input_ver2 from '../components/Input_ver2'
import GenderRadio from '../components/GenderRadio'
import DayForm from '../components/DayForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../api/axios'
const editProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const [profile, setProfile] = useState(currentUser);
  return (
    <SrceenWrapper>
      <UserHeader profile={profile} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <MyProfile profile={profile} setProfile={setProfile} />
    </SrceenWrapper>
  )
}


const UserHeader = ({ profile, currentUser, setCurrentUser }) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutationUpdate = useMutation({
    mutationFn: (profile) => {
      return makeRequest.put("/users/update-profile", profile);
    },
    onSuccess: () => {
      // Làm mới dữ liệu sau khi mutation thành công
      queryClient.invalidateQueries({ queryKey: ["user", currentUser?.username] });
      setCurrentUser(prev => ({
        ...prev,        // giữ lại tất cả các thuộc tính cũ
        ...profile,     // ghi đè 5 thuộc tính có trong profile
      }));
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  })
  const updateProfile = () => {

    console.log(profile)
    if (!profile) return;
    try {
      mutationUpdate.mutate(profile);
    } catch (error) {
      Alert.alert("Errol", error);
    } finally {
      router.back()
    }
  }
  return (
    <View style={styles.header}>
      <View>
        <Header title="Edit Profile" showBackButton={true} />
        <TouchableOpacity style={styles.updateProfileButton} onPress={updateProfile}>
          <Icon name="check" color={theme.colors.check} strokeWidth={0.5} />
        </TouchableOpacity>
      </View>
    </View >
  )
}
const sizeItemOldAvatar = hp(9.5)
const MyProfile = ({ profile, setProfile }) => {
  const handleChange = (key, value) => {
    setProfile((prev) => ({
      ...prev, [key]: value,
    }))
  }
  console.log(profile?.birthday)
  return (
    <View style={styles.myProfileContainer}>
      <View style={{ gap: 15, flexDirection: 'row', alignItems: 'center', height: hp(15) }}>
        <View style={styles.avatarContainer} >
          <Avatar size={hp(15)} link={profile?.pic_avatar} />
        </View>
        <View style={styles.nameAndBirth}>
          <Input_ver2
            name='name'
            placeholder='Fill name'
            color="#d1f0f7"
            size={hp(2.2)}
            value={profile?.name}
            onChangeText={handleChange}
          />
          <DayForm profile={profile} handleChange={handleChange} />
          {/* <Text style={styles.birth}>{format(parseISO(user?.birthday), 'dd/MM/yyyy')}</Text> */}
        </View>
      </View>
      <View style={styles.bioContainer}>
        <Text style={styles.titleInfo}>BIO</Text>
        <TextInput
          style={[
            {
              flex: 1,
              textAlignVertical: 'top', // để text bắt đầu từ trên cùng
              color: '#d1f0f7',         // màu chữ
              height: hp(15),           // chiều cao
              width: '100%',            // full width theo cha
              borderWidth: 0.4,
              borderColor: '#d1f0f7',
              borderRadius: theme.radius.md,
              borderCurve: 'continuous',
              paddingHorizontal: 15
            },
          ]}
          multiline={true}
          blurOnSubmit={false}     // ✅ không ẩn bàn phím khi nhấn Enter
          returnKeyType="default"  // ✅ (optional) chỉnh nút Enter thành xuống dòng
          numberOfLines={4}
          value={profile?.desc}
          onChangeText={(text) => handleChange('desc', text)}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.titleInfo}>INFO ACCOUNT</Text>
        <View style={styles.contentInfo}>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Giới tính: </Text>
            <View style={styles.detailItemInfo}>
              <GenderRadio
                value={profile?.sex}
                onChange={(val) => handleChange('sex', val)}
              />
            </View>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Địa chỉ: </Text>
            <View style={styles.detailItemInfo}>
              <Input_ver2
                name='address'
                placeholder='Fill address'
                color="#d1f0f7"
                size={hp(1.8)}
                value={profile?.address}
                onChangeText={handleChange}
              />
            </View>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Làm việc: </Text>
            <View style={styles.detailItemInfo}>
              <Input_ver2
                name='work'
                placeholder='Fill work'
                color="#d1f0f7"
                size={hp(1.8)}
                value={profile?.work}
                onChangeText={handleChange}
              />
            </View>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>SĐT: </Text>
            <View style={styles.detailItemInfo}>
              <Input_ver2
                name='sdt'
                placeholder='Fill number'
                color="#d1f0f7"
                size={hp(1.8)}
                value={profile?.sdt}
                onChangeText={handleChange}
              />
            </View>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Email: </Text>
            <View style={styles.detailItemInfo}>
              <Input_ver2
                name='email'
                placeholder='Fill email'
                color="#d1f0f7"
                size={hp(1.8)}
                value={profile?.email}
                onChangeText={handleChange}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
export default editProfile

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
  updateProfileButton: {
    position: 'absolute',
    right: 5,
    top: "50%",                   // đẩy nút xuống giữa
    transform: [{ translateY: -17 }],
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  myProfileContainer: {
    flex: 1,
    padding: 15,
    gap: 10
  },
  avatarContainer: {
    height: hp(15)
  },
  nameAndBirth: {
    flex: 1,
    gap: 5,
  },
  nameProfile: {
    fontSize: hp(3),
    fontWeight: theme.fonts.bold,
    color: '#46c9e9',
    textShadowColor: 'rgba(100,100,100,0.8)', // màu bóng
    textShadowOffset: { width: 2, height: 2 }, // lệch theo x, y
    textShadowRadius: 4, // độ mờ bóng   
  },
  bioContainer: {
    width: '100%',
    gap: 5,
    height: hp(20),
    alignItems: 'center'
  },
  info: {
    flex: 1,
    alignItems: 'center'
  },
  titleInfo: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.bold,
    color: '#d1f0f7',
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng
    paddingVertical: 5
  },
  contentInfo: {
    flex: 1,
    fontSize: hp(1.5),
    alignContent: 'center',
    gap: 15,
    paddingTop: 10
  },
  itemInfo: {
    flexDirection: 'row',
    width: '85%',          // hoặc wp(80) nếu dùng responsive
    justifyContent: 'space-between', // căn đều title + detail
    gap: 8,
    alignItems: 'center'
  },
  titleItemInfo: {
    flex: 3,
    color: '#ccc',
    fontSize: 14,
    textAlign: 'right',
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng   
  },
  detailItemInfo: {
    flex: 7,
    color: '#ccc',
    fontSize: 14,
    whiteSpace: 'nowrap', /* Không xuống dòng */
    overflow: 'hidden', /* Ẩn phần chữ bị tràn */
    textOverflow: 'ellipsis',/* Thêm dấu "..." khi chữ bị tràn */
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng   
  },
  item: {
    width: "25%", // 4 cột
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: "white", // bo viền trắng cho ảnh được chọn
    borderRadius: sizeItemOldAvatar / 2 + 4,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatar: {
    borderRadius: sizeItemOldAvatar / 2,
    overflow: "hidden",
  },
  checkMark: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: hp(2),
    padding: 2,
  },
})