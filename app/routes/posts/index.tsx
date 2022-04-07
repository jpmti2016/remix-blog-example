import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

type Post = {
  slug: string;
  title: string;
};

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

export default function Posts() {
  const { posts } = useLoaderData() as LoaderData;
  console.log("posts", posts);
  return (
    <main className="p-10">
      <h1>Posts</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      {posts.map((post) => (
        <Link to={post.slug} key={post.slug} className="text-blue-600">
          <li>{post.title}</li>
        </Link>
      ))}
    </main>
  );
}
