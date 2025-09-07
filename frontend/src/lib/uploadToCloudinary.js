// Upload an image to Cloudinary and return the URL
import {toast} from 'sonner'
export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  formData.append("folder", "profiles");

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; 
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    toast.error("Image upload failed");
    return null;
  }
};
