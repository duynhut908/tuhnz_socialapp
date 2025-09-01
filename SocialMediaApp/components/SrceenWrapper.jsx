import { View, Text } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SrceenWrapper = ({ children, bg }) => {

    const { top, bottom } = useSafeAreaInsets();
    const paddingTop = top > 0 ? top + 5 : 1000;
    const paddingBottom = bottom > 0 ? bottom + 5 : 10;
    return (
        <View style={{ flex: 1, paddingTop, paddingBottom, backgroundColor: bg }}>
            {
                children
            }
        </View>
    )
}

export default SrceenWrapper