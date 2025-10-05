import {toast} from 'sonner';
import { uploadProfileImage } from '@/lib/api';
import { useNetworkRequest } from '@/hooks/useNetworkRequest';
import { MAX_FILE_SIZE } from '@/constants';

interface UseUploadImageProps {
  watchedFile?: File | null;
}

export const useUploadImage = ({ watchedFile }:UseUploadImageProps) => {
  const {
    loading: uploadingFile,
    errorMessage: fileUploadError,
    executeFunction: uploadImage,
  } = useNetworkRequest({
    apiFunction: uploadProfileImage,
  });

const onUploadImage = async () => {
  if (!watchedFile) {
    toast.error('Profile picture is required.');
    return null;
  }

  if (watchedFile?.size > MAX_FILE_SIZE) {
    toast.error('File size must be under 5MB.');
    return null;
  }

  const formData = new FormData();
  console.log(formData)
  formData.append('file', watchedFile);

  try {
    const res = await uploadImage(formData);
    console.log("📷 Upload response:", res);

    // Adjust according to your backend response
    const url = res?.url || res?.data?.url;

    if (!url) {
      toast.error('Failed to upload image');
      return null;
    }

    return url;
  } catch (err: any) {
    console.error("Upload image error:", err);
    toast.error(err?.errorMessage || "Image upload error");
    return null;
  }
};


  return { onUploadImage, uploadingFile, fileUploadError };
};
