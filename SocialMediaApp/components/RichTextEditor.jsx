import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import { theme } from '../constants/theme';

const RichTextEditor = ({
    editorRef,
    onChange
}) => {
    return (
        <View style={{ minHeight: 285 }}>
            <RichToolbar
                actions={[
                    actions.setStrikethrough,
                    actions.removeFormat,
                    actions.setBold,
                    actions.setItalic,
                    actions.insertOrderedList,
                    actions.blockquote,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.code,
                    actions.line,
                    actions.heading1,
                    actions.heading4
                ]}
                iconMap={{
                    [actions.heading1]: ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>,
                    [actions.heading4]: ({ tintColor }) => <Text style={{ color: tintColor }}>H4</Text>
                }}
                style={styles.richBar}
                flatContainerStyle={styles.flatStyle}
                selectedIconTint={theme.colors.primaryDark}
                editor={editorRef}
                disable={false}
            />
            <RichEditor
                ref={editorRef}
                containerStyle={styles.rich}
                editorStyle={styles.contentStyle}
                placeholder={"What's on your mind"}
                onChange={onChange}
            >
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.5)', // darken ảnh
                }} />
            </RichEditor>
        </View >
    )
}

export default RichTextEditor

const styles = StyleSheet.create({
    richBar: {
        borderTopRightRadius: theme.radius.xl,
        borderTopLeftRadius: theme.radius.xl,
        backgroundColor: '#ccc'
    },
    rich: {
        minHeight: 240,
        flex: 1,
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        borderColor: '#ccc',
        backgroundColor: 'transparent'
    },
    contentStyle: {
        color: '#ccc',
        placeholderColor: 'gray',
        backgroundColor: 'transparent'
    },
    flatStyle: {
        paddingHorizontal: 8,
        gap: 3,
    }
})