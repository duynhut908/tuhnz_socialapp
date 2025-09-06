import { ActivityIndicator, Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import SrceenWrapper from '../components/SrceenWrapper';
import Header from '../components/Header';
import { hp, wp } from '../helpers/common';
import Avatar from '../components/Avatar';
import { theme } from '../constants/theme';
import RichTextEditor from '../components/RichTextEditor';
import { AuthContext } from '../context/AuthContext';
import Icon from '../assets/icons';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker'
import { cloudinaryUpload, cloudinaryDeleteImage } from '../api/axiosUpload';
import { Video } from 'expo-av';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../api/axios';
import Loading from '../components/Loading';
const newPost = () => {
    const { currentUser } = useContext(AuthContext);
    const bodyRef = useRef("")
    const editorRef = useRef(null)

    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState([]);
    const uploadPicture = async (formData) => {
        if (loading) return;
        try {
            setLoading(true); // Bắt đầu hiển thị loading
            const response = await cloudinaryUpload(formData);
            console.log("response" + response)
            setImageList(prev => [
                ...prev,
                { url: response.secure_url, publicId: response.publicId, type: response.type }
            ]);

        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
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
    const deleteImageLink = async (publicId, resourceType) => {
        if (imageList.length < 1) return;
        // publicId lấy từ path, ví dụ res.data.file.filename hoặc folder/filename
        try {
            setLoading(true); // Bắt đầu hiển thị loading
            const response = await cloudinaryDeleteImage(publicId, resourceType);
            console.log(response)

        } catch (error) {
            console.error('Error uploading image in fontend:', error);
        } finally {
            setImageList(prev => prev.filter(img => img.publicId !== publicId));
            setLoading(false);
        }
    }
    const router = useRouter()
    const deleteListUped = async () => {
        setLoading(true);
        for (const item of imageList || []) {
            try {
                const response = await cloudinaryDeleteImage(item.publicId, item.type);
                if (response) console.log(response);
            } catch (error) {
                console.error('Error delete image in frontend:', error);
            }
        }
        setLoading(false);
        router.back()
    };


    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (post) => makeRequest.post(`/posts`, post),
        onSuccess: () => {
            // Làm mới dữ liệu sau khi mutation thành công
            queryClient.invalidateQueries({ queryKey: ['posts', currentUser] });
        },
        onError: (error) => {
            console.error("Mutation failed:", error);
        },
    })
    const onSubmit = async () => {
        try {
            mutation.mutate({ desc: bodyRef.current, listImages: imageList });
        } catch (error) {
            Alert.alert("Errol", error);
        } finally {
            router.back()
        }

    }

    return (
        <SrceenWrapper>
            <UserHeader loading={loading} onBackPress={deleteListUped} onSubmit={onSubmit}/>
            <ScrollView contentContainerStyle={{ gap: 20, padding: 8 }}>
                <View style={styles.headerNewPost}>
                    <View style={styles.infoUserPost}>
                        <Avatar size={hp(8.5)} link={currentUser?.pic_avatar} />
                        <View style={{ gap: 2 }}>
                            <View style={styles.name}>
                                <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{currentUser?.name ? currentUser.name : "Không tìm thấy currentUser"}</Text>
                                <Text style={styles.publicText}>Public</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.textEditor}>
                    <RichTextEditor editorRef={editorRef} onChange={body => {
                        bodyRef.current = body;
                    }} />
                </View>
                {imageList.length > 0 && (
                    imageList.map((image) =>
                    (image.type === 'image' ? <View key={image.publicId} style={styles.file}>
                        <Image
                            resizeMode='cover'
                            source={{ uri: image.url }}
                            style={{ flex: 1 }}
                        />
                        <Pressable disabled={loading} style={styles.closeIcon} onPress={() => deleteImageLink(image.publicId, image.type)}>
                            <Icon name='delete' size={20} color='#ccc' />
                        </Pressable>
                    </View> :
                        <View key={image.publicId} style={styles.file}>
                            <Video
                                style={{ flex: 1 }}
                                source={{ uri: image.url }}
                                useNativeControls
                                resizeMode='cover'
                                isLooping
                            />
                            <Pressable disabled={loading} style={styles.closeIcon} onPress={() => deleteImageLink(image.publicId, image.type)}>
                                <Icon name='delete' size={20} color='#ccc' />
                            </Pressable>
                        </View>)
                    )
                )}
                <View style={styles.media}>
                    <Text style={styles.addImage}>Add to your post</Text>
                    <View style={styles.mediaIcons}>
                        <TouchableOpacity disabled={loading} onPress={() => onPick(true)}>
                            <Icon name="image" size={30} color={loading ? '#5c9b88' : 'green'} />
                        </TouchableOpacity>
                        <TouchableOpacity disabled={loading} onPress={() => onPick(false)}>
                            <Icon name="video" size={32} color={loading ? '#5c9b88' : 'green'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* <Button buttonStyle={{ height: hp(6.2) }}
                    title="Post"
                    loading={loading}
                    hasShadow={false}
                    onPress={() => {
                        console.log("Button pressed");
                        onSubmit();
                    }}
                /> */}
        </SrceenWrapper >
    )
}

const UserHeader = ({ loading, onBackPress, onSubmit }) => {
   
    return (
        <View style={styles.header}>
            <View>
                <Header title="Edit Profile" showBackButton={true} onBackPress={onBackPress} />
                {loading ? <View style={[styles.postButton]}>
                    <ActivityIndicator size='small' color={theme.colors.check} />
                </View> : <TouchableOpacity style={styles.postButton} onPress={onSubmit}>
                    <Icon name="check" color={theme.colors.check} strokeWidth={0.5} />
                </TouchableOpacity>}
            </View>
        </View >
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
    postButton: {
        position: 'absolute',
        right: 5,
        top: "50%",                   // đẩy nút xuống giữa
        transform: [{ translateY: -17 }],
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    headerNewPost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', /* đẩy A sang trái, B sang phải */
    },
    infoUserPost: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    buttonPost: {

    },
    name: {
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
        color: '#46c9e9',
        maxWidth: wp(40)
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
    addImage: {
        fontSize: hp(1.9),
        fontWeight: theme.fonts.medium,
        color: '#ccc'
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