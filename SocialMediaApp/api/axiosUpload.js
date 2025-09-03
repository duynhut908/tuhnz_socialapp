import axios from "axios"
import { makeRequest } from "./axios";

const cloudinaryUpload = (fileToUpload) => {
    return makeRequest
        .post('uploads/cloudinary-upload', fileToUpload, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data) // Trả về dữ liệu từ response
        .catch((err) => {
            console.error(err);
            throw new Error('Error uploading image');
        });
}
const cloudinaryDeleteImage = async (publicId) => {
    if (!publicId) throw new Error("No publicId provided");
    try {
      const res = await makeRequest.delete("/uploads/cloudinary-deleteImage", {
        data: { publicId }
      });
      return res.data;
    } catch (err) {
      console.error("Error deleting image in axios:", err.response?.data || err.message);
      throw err;
    }
  };
export { cloudinaryUpload, cloudinaryDeleteImage };