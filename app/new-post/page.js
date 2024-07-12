import PostSubmit from "@/components/post-submit";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";


export default function NewPostPage() {
  async function createPost(prevState, formData) {
    "use server";
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

    await storePost({
      imageUrl: "",
      title,
      content,
      userId: 1,
    });

    redirect("/feed");
  }

  return <PostSubmit action={createPost} />
}
