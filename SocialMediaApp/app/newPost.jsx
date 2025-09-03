import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import SrceenWrapper from '../components/SrceenWrapper';
import Header from '../components/Header';
import { hp } from '../helpers/common';
import Avatar from '../components/Avatar';
import { theme } from '../constants/theme';
import RichTextEditor from '../components/RichTextEditor';
import { AuthContext } from '../context/AuthContext';
import Icon from '../assets/icons';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker'
import { cloudinaryUpload, cloudinaryDeleteImage } from '../api/axiosUpload';

const newPost = () => {
    // const router = useRouter();
    // const params = useLocalSearchParams(); // trả về object chứa tất cả params
    // const note = params.user;          // lấy giá trị note


    const { currentUser } = useContext(AuthContext);
    const bodyRef = useRef("")
    const editorRef = useRef(null)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageLink, setImageLink] = useState(null);
    const [publicIdImage, setPublicIdImage] = useState(null)
    const uploadPicture = async (formData) => {
        try {
            setLoading(true); // Bắt đầu hiển thị loading
            const response = await cloudinaryUpload(formData);
            console.log(response)
            console.log(response.secure_url)
            setImageLink(response.secure_url); // Gán link ảnh vào state
            setPublicIdImage(response.publicId)

        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false); // Ẩn loading sau khi xử lý xong
            console.log(imageLink)
        }
    }
    const onPick = async (isImage) => {
        let mediaConfig = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7
        }
        if (!isImage) {
            mediaConfig = {
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
            }
        }
        let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

        if (!result.canceled) {

            const pickedFile = result.assets[0];

            // Tạo FormData
            const formData = new FormData();
            formData.append('file', {
                uri: pickedFile.uri,
                type: pickedFile.type === 'video' ? 'video/mp4' : 'image/jpeg',
                name: pickedFile.fileName || (pickedFile.type === 'video' ? 'video.mp4' : 'photo.jpg'),
            });

            uploadPicture(formData); // gửi FormData
        }

    }
    const isLocalFile = file => {
        if (!file) return null;
        if (typeof file == 'object') return true;
        return false
    }
    const getFileType = file => {
        if (!file) return null;
        if (isLocalFile(file)) {
            return file.type;
        }

        if (file.includes('postImage')) {
            return 'image';
        }

        return 'video';
    }
    const deleteImageLink = async () => {
        if (!imageLink || !publicIdImage) return;
        // publicId lấy từ path, ví dụ res.data.file.filename hoặc folder/filename
        try {
            setLoading(true); // Bắt đầu hiển thị loading
            const response = await cloudinaryDeleteImage(publicIdImage);
            console.log(response)

        } catch (error) {
            console.error('Error uploading image in fontend:', error);
        } finally {
            setImageLink(null);
            setPublicIdImage(null);
            setLoading(false);
        }
    }
    const onSubmit = async () => {

    }
    return (
        <SrceenWrapper>
            <ImageBackground
                source={require('../assets/images/backgroudWelcom.jpg')}
                style={styles.container}
                resizeMode="cover"
            >

                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.5)', // darken ảnh
                }} />

                <View style={styles.header}>
                    <View>
                        <Header title="New Post" showBackButton={true} />
                    </View>
                </View >
                <ScrollView contentContainerStyle={{ gap: 20, padding: 8 }}>
                    <View style={styles.headerNewPost}>
                        <Avatar size={hp(8.5)} />
                        <View style={{ gap: 2 }}>
                            <View style={styles.name}>
                                <Text style={styles.name}>An Thời Đại</Text>
                                <Text style={styles.publicText}>Public</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.textEditor}>
                        <RichTextEditor editorRef={editorRef} onChange={body => bodyRef.current = body} />
                    </View>
                    {imageLink && (
                        <View style={styles.file}>
                            <Image
                                resizeMode='cover'
                                source={{ uri: imageLink }}
                                style={{ flex: 1 }}
                            />
                            <Pressable style={styles.closeIcon} onPress={() => deleteImageLink()}>
                                <Icon name='delete' size={20} color='#ccc' />
                            </Pressable>
                        </View>
                    )}
                    <View style={styles.media}>
                        <Text style={styles.addImage}>Add to your post</Text>
                        <View style={styles.mediaIcons}>
                            <TouchableOpacity onPress={() => onPick(true)}>
                                <Icon name="image" size={30} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onPick(false)}>
                                <Icon name="video" size={32} color="green" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <Button buttonStyle={{ height: hp(6.2) }}
                    title="Post"
                    loading={loading}
                    hasShadow={false}
                    onPress={onSubmit}
                />
            </ImageBackground >
        </SrceenWrapper >
    )
}

export default newPost

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
    headerNewPost: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    name: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: '#46c9e9'
    },
    publicText: {
        fontSize: hp(1.9),
        fontWeight: theme.fonts.medium,
        color: '#ccc'
    },
    media: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        padding: 12,
        paddingHorizontal: 18,
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous',
        borderColor: '#ccc'
    },
    mediaIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    file: {
        height: hp(30),
        width: '100%',
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
        borderCurve: 'continuous'
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        borderRadius: 50,
        backgroundColor: 'rgba(255,0,0,0.6)'
    }
})