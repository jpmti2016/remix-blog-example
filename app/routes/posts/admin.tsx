import type { LoaderFunction } from "@remix-run/server-runtime";
import { Link, useLoaderData, Outlet } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json({ posts: await getPosts() });
};

export default function PostAdmin() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <div className="max-w-4xl p-4 mx-auto md:p10">
      <h1 className="my-6 mb-2 text-3xl text-center border-b-2">Blog Admin</h1>
      <div className="md:grid md:grid-cols-4 md:gap-6">
        <nav className="md:col-span-1">
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={post.slug} className="text-blue-600 underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
