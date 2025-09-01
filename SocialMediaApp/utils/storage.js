import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  getUser: async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Get user error:", error);
      return null;
    }
  },

  setUser: async (user) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Set user error:", error);
    }
  },

  clearUser: async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.error("Clear user error:", error);
    }
  },
};
