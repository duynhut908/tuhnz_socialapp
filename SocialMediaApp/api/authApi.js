import { makeRequest } from "./axios";

export const authApi = {
  login: async (inputs) => {
    return await makeRequest.post("auth/login", inputs);
  },
  signup: async (inputs) => {
    return await makeRequest.post("auth/signup", inputs);
  },
  logout: async () => {
    return await makeRequest.post("auth/logout");
  },
};