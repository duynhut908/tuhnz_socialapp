import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme';
import Home from './Home';
import ArrowLeft from './ArrowLeft';
import Call from './Call';
import Camera from './Camera';
import Logout from './Logout';
import Comment from './Comment';
import Delete from './Delete';
import Edit from './Edit';
import Heart from './Heart';
import Image from './Image';
import Location from './Location';
import Lock from './Lock';
import Mail from './Mail';
import More from './More';
import Plus from './Plus';
import Search from './Search';
import Send from './Send';
import Share from './Share';
import User from './User';
import Video from './Video';
import Notify from './Notify';
import Story from './Story';
import Friends from './Friends';
import Menu from './Menu';
import MenuStraight from './MenuStraight';
import Messages from './Messages';
import NewPost from './NewPost';
import Check from './Check';
import SetImage from './SetImage';
import SaveImage from './SaveImage';
import DeleteImage from './DeleteImage';
import NewImage from './NewImage';
import Sticker from './Sticker';
import Conversation from './Conversation';
import Dot from './Dot';
import MoreStraight from './MoreStraight';
import Report from './Report';
import Return from './Return';
import Volume from './Volume';
import Micro from './Micro';
import Premium from './Premium';
import Event from './Event';
import Market from './Market';
import Storage from './Storage';
import Page from './Page';
import Group from './Group';
import Setting from './Setting';
const icons = {
    home: Home,
    arrowleft: ArrowLeft,
    call: Call,
    camera: Camera,
    comment: Comment,
    delete: Delete,
    edit: Edit,
    heart: Heart,
    image: Image,
    location: Location,
    lock: Lock,
    logout: Logout,
    mail: Mail,
    more: More,
    moreStraight: MoreStraight,
    plus: Plus,
    search: Search,
    send: Send,
    share: Share,
    user: User,
    video: Video,
    notify: Notify,
    story: Story,
    friends: Friends,
    menu: Menu,
    menustraight: MenuStraight,
    messages: Messages,
    newPost: NewPost,
    check: Check,
    setImg: SetImage,
    saveImg: SaveImage,
    delImg: DeleteImage,
    newImg: NewImage,
    sticker: Sticker,
    conversation: Conversation,
    dot: Dot,
    report: Report,
    return: Return,
    volume: Volume,
    micro: Micro,
    premium: Premium,
    event: Event,
    market: Market,
    storage: Storage,
    page: Page,
    group: Group,
    setting: Setting
}

const Icon = ({ name, ...props }) => {
    const IconComponent = icons[name];
    if (!IconComponent) return null; // tránh undefined gây crash
    return (
        <IconComponent
            height={props.size || 24}
            width={props.size || 24}
            strokeWidth={props.strokeWidth || 1.9}
            color={theme.colors.textLight}
            {...props} />
    )
}

export default Icon
const styles = StyleSheet.create({})