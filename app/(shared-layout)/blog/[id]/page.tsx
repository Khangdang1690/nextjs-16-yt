import { buttonVariants } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchAuthQuery, preloadAuthQuery } from "@/lib/auth-server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { Metadata } from "next";
import PostPresence from "@/components/web/PostPresence";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PostIdRouteProps {
  params: Promise<{
    id: Id<"posts">;
  }>
}

export async function generateMetadata({params}: PostIdRouteProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchAuthQuery(api.posts.getPostById, { postId: id });

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.body,
  }
}

export default async function PostIdRoute({ params }: PostIdRouteProps) {
  const { id } = await params;

  const [post, preloadedComments, userId] = await Promise.all([
    await fetchAuthQuery(api.posts.getPostById, { postId: id }),
    await preloadAuthQuery(api.comments.getCommentsByPost,
    {
      postId: id
    }),
    await fetchAuthQuery(api.presence.getUserId),
  ])

  if (!userId) {
    return redirect("/auth/login");
  }

  if (!post) {
    return (
      <div>
        <h1 className="text-6xl font-extrabold text-red-500">No post found</h1>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link className={buttonVariants({variant: "outline", className: "mb-4"})} href="/blog">
        <ArrowLeft className="size-4"/>
        Back to blog
      </Link>

      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={post.imageUrl ?? '/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-4 flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>

        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
          </p>
          {userId && <PostPresence roomId={post._id} userId={userId}/>}
        </div>
      </div>

      <Separator className="my-8"/>

      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>

      <Separator className="my-8"/>

      <CommentSection preloadedComments={preloadedComments}/>
    </div>
  )
}