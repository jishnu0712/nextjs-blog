import { createPost } from "@/actions/posts";
import PostSubmit from "@/components/post-submit";


export default function NewPostPage() {
  return <PostSubmit action={createPost} />
}
