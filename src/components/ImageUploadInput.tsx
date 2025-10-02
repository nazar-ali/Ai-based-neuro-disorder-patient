'use client';

import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
interface ImageUploadInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classes?: string;
  watchedFile?: File | null;
  removeSelectedFile: () => void;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = "Upload Image",
  classes = "",
  watchedFile,
  removeSelectedFile,
  ...inputProps // 👈 capture register props
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const file = watchedFile instanceof File ? watchedFile : null;

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  const onRemoveImage = () => {
    setPreview(null);
    removeSelectedFile();
  };

  return (
    <div className={`w-full ${classes}`}>
      <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>

      {preview ? (
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="object-contain rounded-md max-h-20 md:max-h-24"
              width={100}
            />
            <MdCancel
              className="absolute -top-2 -right-2 text-gray bg-black rounded-full cursor-pointer"
              size={20}
              onClick={onRemoveImage}
            />
          </div>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple={false}
            className="absolute inset-0 opacity-0 cursor-pointer"
            {...inputProps} // 👈 apply register props here
          />
          <span className="text-black text-sm text-center">
            Click or drag image here <br />
            (Size 5MB max.)
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
