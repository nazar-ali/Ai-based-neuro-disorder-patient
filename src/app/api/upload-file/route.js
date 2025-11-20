import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN, // ✅ REQUIRED!!

      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif"],
          allowOverwrite: true,
          tokenPayload: JSON.stringify({
            userId: "h348n23jjj23", // replace with logged-in user
            projectId: 23,
          }),
        };
      },

      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("📂 Upload completed:", blob);

        try {
          const { userId, projectId } = JSON.parse(tokenPayload);
          console.log(
            `✅ File uploaded for user: ${userId}, projectId: ${projectId}`
          );
        } catch (error) {
          console.error("❌ Error parsing tokenPayload:", error);
          throw new Error("Could not process upload completion");
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (err) {
    console.error("❌ Upload failed:", err);
    return NextResponse.json(
      { error: err.message || "Upload failed" },
      { status: 500 }
    );
  }
}
