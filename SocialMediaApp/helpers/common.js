import { Dimensions } from "react-native";

const { width: deviceWith, height: deviceHeight } = Dimensions.get('window');
export const hp = percentage => {
    return (percentage * deviceHeight) / 100;
}
export const wp = performance => {
    return (performance * deviceWith) / 100;
}