import axios from "axios"

export const makeRequest = axios.create({
    baseURL: "https://better-cloths-pay.loca.lt/api/",
    withCredentials: true,
    headers: {
        'bypass-tunnel-reminder': 'true' // Bắt buộc phải có
    }
})

