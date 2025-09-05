import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
const editProfile = () => {
  const currentUser =
  {
    address: "An Đông", birthday: "2001-12-30T17:00:00.000Z", desc: "Mặt đất màu gì, tôi chẳng biết, cho đến khi cúi đầu xin vợ tha thứ.", email: "racingboy@gmail.com",
    emailToken: "d3a57275870dbc55f90b64609aa52faa00fc704063a86de9ef7011f2bb0763e8270044a1fe7c6ad0238194e339fa6142e4c8cd0b098c4091fa863e5fd51ae220", id: 14, name: "Lữ Tra Nam", password: "$2a$10$eAaW7oWSUEmXTLfYSyemMuA12gNTY5BybqPyB5IHrPqMKWDoPmyYW",
    pic_avatar: "https://i.pinimg.com/736x/ca/4a/e9/ca4ae9bad6e76f0b2275bc6e570ea71b.jpg", sdt: "0449 339 210",
    sex: 1, username: "trnam", verify: null, work: "Trường đua và Trường đời"
  }
  return (
    <SrceenWrapper>
        <View style={styles.header}>
          <View>
            <Header title="Edit Profile" showBackButton={true} />
          </View>
        </View >
        <MyProfile user={currentUser} />
    </SrceenWrapper>
  )
}
const sizeItemOldAvatar = hp(9.5)
const MyProfile = ({ user }) => {
  const router = useRouter()
  const [loading, setLoading] = useState()

  const [selected, setSelected] = useState(null);

  const listAvatars = [
    "https://i.pinimg.com/736x/ca/4a/e9/ca4ae9bad6e76f0b2275bc6e570ea71b.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",
    "https://i.pinimg.com/736x/a1/01/03/a1010343b58861a5f7ab62c89a1465b7.jpg",

  ];

  return (
    <View style={styles.myProfileContainer}>
      <View style={styles.avatarEdit}>

        <Avatar size={hp(20)} link={user?.pic_avatar} />
        <View style={styles.listInteractButton}>
          <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
            title="Set ảnh"
            loading={loading}
            hasShadow={false}
            onPress={() => {
              console.log("Button set avatar pressed");
              onSubmit();
            }}
          />
          <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
            title="Ảnh mới"
            loading={loading}
            hasShadow={false}
            onPress={() => {
              console.log("Button new avatar pressed");
              onSubmit();
            }}
          />
          <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
            title="Lưu ảnh"
            loading={loading}
            hasShadow={false}
            onPress={() => {
              console.log("Button save avatar pressed");
              onSubmit();
            }}
          />
          <ButtonIcon buttonStyle={{ height: hp(6), width: hp(11.5) }}
            title="Xóa ảnh"
            loading={loading}
            hasShadow={false}
            onPress={() => {
              console.log("Button delete avatar pressed");
              onSubmit();
            }}
          />
        </View>
      </View>
      <View //style={{ flex: 1 }}
      >
        <Text style={styles.titleSelectOldAvatar}>Saved Avatar</Text>
        <ScrollView
          style={styles.listOldAvatar}
          contentContainerStyle={styles.listOldAvatarContent}
          showsVerticalScrollIndicator={true}
        >
          {listAvatars.map((link, index) => {
            const isSelected = selected === index;
            const isSet = user?.pic_avatar === index; // giả sử bạn có state lưu avatar đang dùng

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.item,
                  isSelected && styles.selectedItem, // bo viền trắng khi chọn
                ]}
                onPress={() => setSelected(index)}
              >
                {/* Avatar */}
                <View style={styles.avatarWrapper}>
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: "#ddd" }, // nền nếu chưa load ảnh
                    ]}
                  >
                    <View
                      style={{
                        width: sizeItemOldAvatar,
                        height: sizeItemOldAvatar,
                        borderRadius: sizeItemOldAvatar / 2,
                        overflow: "hidden",
                      }}
                    >
                      <Avatar size={sizeItemOldAvatar} link={link} />
                    </View>
                  </View>

                  {/* dấu check xanh lá cho ảnh đang được set */}
                  {isSet && (
                    <View style={styles.checkMark}>
                      <Check size={hp(2.5)} color="green" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* <View style={{ gap: 15, }}>
        <View style={styles.avatarContainer} >

          {<Pressable style={[styles.editIcon,]}>
            <Icon name="edit" strokeWidth={2.5} size={20} />
          </Pressable>}
          <Text style={styles.nameProfile}>{user?.name}</Text>
          <Text style={styles.bioProfile}>"{user?.desc}"</Text>
        </View>
      </View> */}
      {/* <View style={styles.info}>
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
      </View> */}
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
    maxHeight: hp(30)
  },
  listOldAvatarContent: {
    gap: 10,            // khoảng cách giữa các phần tử
    flexDirection: 'row',
    flexWrap: 'wrap',
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