"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
    const title = formData.get("title");
    const image = formData.get("image");
    const content = formData.get("content");

    let errors = [];

    if (!title || title.trim().length === 0) {
      errors.push("title must be a valid title");
    }

    if (!content || content.trim().length === 0) {
      errors.push("content must be a valid content");
    }

    if (!image || image.size === 0) {
      errors.push("image must be selected");
    }

    if (errors.length > 0) {
      return { errors };
    }

    let imageUrl;

    try {
        imageUrl = await uploadImage(image);
        await storePost({
          imageUrl: imageUrl,
          title,
          content,
          userId: 1,
        });
    } catch (error) {
        throw new Error("Image upload failed, post not created: " + error.message);
    }


    redirect("/feed");
  }

  export async function togglePostLikeStatus(postId) {
    await updatePostLikeStatus(postId, 2);
    revalidatePath('/', 'layout');
  }