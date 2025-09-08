import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { hp, wp } from "../helpers/common";
import { theme } from "../constants/theme";
import Icon from "../assets/icons";

const DayForm = ({ profile, handleChange }) => {
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            handleChange("birthday", format(selectedDate, "yyyy-MM-dd"));
        }
    };
    
    return (
        <View style={{ width: wp(30), flexDirection: 'row', alignItems: 'center' }}>

            {/* Nút mở DatePicker */}
            <View
                // onPress={() => setShowPicker(true)}
                style={{
                    backgroundColor: "transparent",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    borderRadius: 8,
                    alignItems: "center",
                    borderWidth: 0.4,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    borderCurve: 'continuous',
                }}
            >
                <Text style={{ color: profile?.birthday ? "#fff" : "#9d9d9d", fontSize: 14 }}>
                    {profile?.birthday
                        ? format(new Date(profile.birthday), "dd/MM/yyyy")
                        : "Select day"}
                </Text>

            </View>
            <Pressable
                style={[styles.editIcon, { marginLeft: 4 }]}
                onPress={() => setShowPicker(true)}
            >
                <Icon name="edit" strokeWidth={2} size={15} color='white' />
            </Pressable>

            {/* Hiện DatePicker khi ấn */}
            {showPicker && (
                <DateTimePicker
                    value={profile?.birthday ? new Date(profile.birthday) : new Date()}
                    mode="date"
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()} // không cho chọn ngày tương lai
                />
            )}
        </View>
    );
};
export default DayForm

const styles = StyleSheet.create({
    editIcon: {
        padding: 4,
        borderRadius: 50,
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
        backgroundColor: 'gray'
    },
})