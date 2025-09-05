import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useRouter } from 'expo-router';
import SrceenWrapper from '../components/SrceenWrapper';
import Header from '../components/Header';
import { hp, wp } from '../helpers/common';
import Icon from '../assets/icons';
import { theme } from '../constants/theme';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from "react-native-dropdown-picker";
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import PageA from './pageA';
const profile = () => {
  const { currentUser, setCurrentUser, handleLogout } = useContext(AuthContext);
  const router = useRouter()
  const onLogout = async () => {
    try {
      await handleLogout();
      router.replace('/welcome');
    } catch (err) {
      console.log(err)
    }
  }
  const submitLogout = () => {
    Alert.alert('Confirm', "Are you sure you want to log out?", [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('modal canceled')
        },
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () => onLogout(),
        style: 'destructive'
      }
    ])
  }
  return (
    <SrceenWrapper>
      <UserHeader user={currentUser} router={router} handleLogout={submitLogout} />
      <UserBody user={currentUser} router={router} />
    </SrceenWrapper>
  )
}


const UserHeader = ({ user, router, handleLogout }) => {
  return (
    <View style={styles.header}>
      <View>
        <Header title="Profile" showBackButton={true} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" color={theme.colors.rose} />
        </TouchableOpacity>
      </View>
    </View >
  )
}
const UserBody = ({ user, router }) => {
  const [selectedTab, setSelectedTab] = useState("profile");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Profile", value: "edit", color: "#68c8e5" },
    { label: "Posts", value: "story", color: "#c382f5" },
    { label: "Album", value: "image", color: "#86d94d" },
    { label: "Video", value: "video", color: "#f15945" },
  ]);
  useEffect(() => {
    if (selectedTab === 'image') {
      // đảm bảo chỉ navigate khi có dữ liệu và component mount
      router.push({
        pathname: 'album',
        params: { user: JSON.stringify(user) },
      });
      setSelectedTab("profile")
    }
    else if (selectedTab === 'story') {
      // đảm bảo chỉ navigate khi có dữ liệu và component mount
      router.push({
        pathname: 'myPosts',
        params: { user: JSON.stringify(user) },
      });
      setSelectedTab("profile")
    }
    else if (selectedTab === 'video') {
      // đảm bảo chỉ navigate khi có dữ liệu và component mount
      router.push({
        pathname: 'pageA',
      });
      setSelectedTab("profile")
    }
  }, [selectedTab]);


  const renderContent = () => {
    switch (selectedTab) {
      case "edit":
        return <Text>Edit Profile</Text>;
      case "story":
        return <Text></Text>;
      case "image":
        return <Text></Text>;
      case "video":
        return <Text></Text>
      default:
        return <MyProfile user={user} />;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (open) setOpen(false); // nếu dropdown đang mở thì đóng
        Keyboard.dismiss();       // ẩn bàn phím nếu đang mở
      }}
    >
      <View style={styles.bodyProfile}>
        <View style={styles.comboWrapper}>
          <DropDownPicker
            open={open}
            value={selectedTab}
            items={items}
            setOpen={setOpen}
            setItems={setItems}
            setValue={callback => setSelectedTab(callback())}
            placeholder=""
            style={styles.comboBox}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={styles.comboText}

            animationType="slide"
            animationDuration={300}
            ArrowDownIconComponent={({ style }) => (
              <Icon name="menu" size={hp(2.5)} strokeWidth={2} color='#baffd7' />
            )}
            ArrowUpIconComponent={({ style }) => (
              <Icon name="menustraight" size={hp(2.5)} strokeWidth={2} color='#baffd7' />
            )}

            renderListItem={({ item }) => (
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 4, padding: 6, paddingRight: 10 }}
                onPress={() => {
                  setSelectedTab(item.value); // cập nhật state
                  setOpen(false);              // đóng dropdown
                }}
              >
                <Text style={[styles.textItemCombobox,]}>{item.label}</Text>
                <Icon name={item.value} size={hp(2.6)} strokeWidth={2} color={item.color} />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.containerBody}>
          {renderContent()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const MyProfile = ({ user }) => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  return (
    <View style={styles.myProfileContainer}>
      <View style={{ gap: 15, }}>
        <View style={styles.avatarContainer} >
          <Avatar size={hp(20)} link={user?.pic_avatar} />
          {currentUser?.username === user?.username && <Pressable style={[styles.editIcon,]} onPress={() => router.push('editAvatar')}>
            <Icon name="edit" strokeWidth={2.5} size={20} />
          </Pressable>}
          <Text style={styles.nameProfile}>{user?.name}</Text>
          <Text style={styles.bioProfile}>"{user?.desc}"</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.titleInfo}>INFO ACCOUNT</Text>
        <View style={styles.contentInfo}>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Ngày sinh: </Text>
            <Text style={styles.detailItemInfo}>{user?.birthday ? format(parseISO(user?.birthday), 'dd/MM/yyyy') : "Không hiển thị"}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Giới tính: </Text>
            <Text style={styles.detailItemInfo}>{user?.sex ? "Nam" : "Nữ"}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Địa chỉ: </Text>
            <Text style={styles.detailItemInfo}>{user?.address ? user?.address : "Không hiển thị"}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Làm việc: </Text>
            <Text style={styles.detailItemInfo}>{user?.work ? user?.work : "Không hiển thị"}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>SĐT: </Text>
            <Text style={styles.detailItemInfo}>{user?.sdt ? user?.sdt : "Không hiển thị"}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.titleItemInfo}>Email: </Text>
            <Text style={styles.detailItemInfo}>{user?.email ? user?.email : "Không hiển thị"}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}


export default profile


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingHorizontal: wp(4)
    backgroundColor: "#000",
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 5,
    height: hp(7),
    borderBottomWidth: 0.5,
    borderColor: '#c4d3d9',      // màu viền
    justifyContent: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 5,
    top: "50%",                   // đẩy nút xuống giữa
    transform: [{ translateY: -17 }],
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  bodyProfile: {
    flex: 1,
    padding: 5,
  },
  comboWrapper: {
    zIndex: 1000, // rất quan trọng để dropdown hiển thị đúng
    position: "absolute",   // cố định vị trí
    top: 5,                // cách mép trên 10px
    right: 5,
    width: 110,
  },
  comboBox: {
    borderRadius: 8,
    borderWidth: 0,
    height: 40,
    borderColor: "green",
    backgroundColor: "transparent",
  },
  comboText: {
    fontSize: 13.5,
    fontWeight: theme.fonts.bold,
    color: '#d9edee',
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng
    textAlign: "right"
  },
  dropdownContainer: {
    borderColor: "green",
    borderRadius: 8,
    borderWidth: 0,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  textItemCombobox: {
    fontSize: 12.2,
    fontWeight: theme.fonts.bold,
    color: '#beb3b2',
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng
  },
  containerBody: {
    flex: 1,
    //backgroundColor: theme.colors.primaryApp,
    padding: 5,
    borderRadius: 8,
    color: 'white'
  },
  myProfileContainer: {
    flex: 1,
    paddingTop: 15,
  },
  avatarContainer: {
    alignSelf: 'center'
  },
  editIcon: {
    position: 'absolute',
    right: 90,
    top: 108,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
    backgroundColor: '#ccc'
  },
  nameProfile: {
    fontSize: hp(3),
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: theme.fonts.bold,
    color: '#46c9e9',
    textShadowColor: 'rgba(100,100,100,0.8)', // màu bóng
    textShadowOffset: { width: 2, height: 2 }, // lệch theo x, y
    textShadowRadius: 4, // độ mờ bóng   
  },
  bioProfile: {
    fontSize: hp(1.7),
    alignSelf: 'center',
    marginTop: 6,
    marginBottom: 10,
    fontWeight: theme.fonts.medium,
    color: '#ccc',
    textAlign: 'center',
    width: wp(85),
    fontStyle: 'italic',
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
    marginVertical: 20
  },
  contentInfo: {
    flex: 1,
    fontSize: hp(1.5),
    alignContent: 'center',
    gap: 10,
  },
  itemInfo: {
    flexDirection: 'row',
    width: '85%',          // hoặc wp(80) nếu dùng responsive
    justifyContent: 'space-between', // căn đều title + detail
    gap: 8,
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
  myAlbumContainer: {
    flex: 1,
    paddingTop: 15
  },
  titleAlbum: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.bold,
    color: '#d1f0f7',
    textShadowColor: 'rgba(0,0,0,0.6)', // màu bóng
    textShadowOffset: { width: 1, height: 1 }, // lệch theo x, y
    textShadowRadius: 2, // độ mờ bóng   
    marginVertical: 10
  },
  someImage: {
    flexDirection: 'row',
    height: hp(11),
    marginBottom: 10,
    marginHorizontal: 10,
    gap: 2.5
  },
  oneImage: {
    height: hp(11),
    width: hp(11),
    backgroundColor: 'red',
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
})