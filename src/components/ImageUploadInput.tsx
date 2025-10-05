"use client";

import { useRef, useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { MdCancel } from "react-icons/md";

interface ImageUploadInputProps {
  label?: string;
  classes?: string;
  removeSelectedFile: () => void;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ added for RHF integration
}


const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label = "Upload Image",
  classes = "",
  removeSelectedFile,
  name,
  onChange
}) => {
  const htmlInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // update preview when file changes
  const handleFileChange = () => {
    if (htmlInputRef.current?.files?.[0]) {
      const file = htmlInputRef.current.files[0];
      setSelectedFileName(file.name);

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setSelectedFileName(null);
      setPreview(null);
    }
  };

  // handle upload when form is submitted (or directly when file selected)
  const handleUpload = async () => {
    if (!htmlInputRef.current?.files?.[0]) return;

    setProgress(0);
    setUploading(true);
    setUploadedUrl(null);

    const file = htmlInputRef.current.files[0];

    try {
      const blob = await upload(`projects/projectId/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: (progressEvent) => {
          setProgress(progressEvent.percentage);
        },
      });

      setUploadedUrl(blob.url);
    } catch (error) {
      console.error("❌ Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const onRemoveImage = () => {
    setPreview(null);
    setSelectedFileName(null);
    setUploadedUrl(null);
    removeSelectedFile();
  };

  return (
    <div className={`w-full ${classes}`}>
      <label className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* If preview available */}
      {preview ? (
        <div className="flex flex-col items-center">
          <div className="relative group">
            <img
              src={preview}
              alt="Preview"
              className="object-cover rounded-lg shadow-md max-h-28 w-auto"
            />
            <MdCancel
              className="absolute -top-2 -right-2 text-white bg-black rounded-full cursor-pointer hover:bg-red-600 transition-colors"
              size={22}
              onClick={onRemoveImage}
            />
          </div>

          {/* Upload button */}
          {/* {!uploadedUrl && (
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          )} */}

          {/* Progress bar */}
          {uploading && (
            <div className="w-full mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-1">
                {Math.round(progress)}% uploaded
              </p>
            </div>
          )}

          {/* Success message */}
          {uploadedUrl && (
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg text-center text-sm">
              ✅ Uploaded successfully:{" "}
              <a
                href={uploadedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {uploadedUrl}
              </a>
            </div>
          )}
        </div>
      ) : (
        // Default upload area
        <div className="relative flex items-center justify-center w-full h-28 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:border-indigo-500 bg-white/70 transition">
          <input
            id="file-upload"
            name={name}
            ref={htmlInputRef}
            type="file"
            accept="image/jpeg, image/png, image/gif"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              handleFileChange();
              if (onChange) onChange(e); // ✅ propagate to RHF
            }}
          />

          <span className="text-gray-600 text-sm text-center px-2">
            Click or drag an image here
            <br />
            <span className="text-xs text-gray-400">(Max size: 5MB)</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
