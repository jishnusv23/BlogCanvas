import axios from "axios";

export const uploadImageToCloudinary = async (file: File) => {
  const imageData = new FormData();
  imageData.append("file", file);
  imageData.append("upload_preset", "upload");

  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/dlitqiyia/image/upload",
    imageData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.url;
};
