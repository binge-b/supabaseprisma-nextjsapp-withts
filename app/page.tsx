import Image from 'next/image'
import Link from 'next/link';
import { PostType } from './types';

// 全記事取得用APIたたく用関数
async function fetchAllBlogs() {
  const res = await fetch(`http://localhost:3001/api/blog`,{
    cache: "no-store",
  });

  const data = await res.json();

  // return data = await res.json();

  return data.posts;
}

export default async function Home() {
  const posts = await fetchAllBlogs();

  return (
    <main className="w-full h-full">
  <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-blue-900 drop-shadow-xl">
    <h1 className="text-slate-900 text-center text-2xl font-extrabold">
      Portfolio
    </h1>
  </div>
  {/* Link */}
  <div className="flex my-5">
    <Link
      href={"/blog/add"}
      className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-orange-200 font-semibold"
    >
      新規作成
    </Link>
  </div>

  <div className="w-full flex flex-col justify-center items-center">
    {posts.map((post: PostType) => (
      <div
      key={post.id}
      className="w-3/4 p-4 rounded-md mx-3 my-2 bg-orange-300 flex flex-col justify-center">
      <div className="flex items-center my-3">
        <div className="mr-auto">
          <h2 className="mr-auto font-semibold">{post.title}</h2>
        </div>
        <Link
          href={`/blog/edit/${post.id}`}
          className="px-4 py-1 text-center text-xl bg-slate-900 rounded-md font-semibold text-slate-800"
        >
          編集
        </Link>
      </div>

      <div className="mr-auto my-1">
        <blockquote className="font-bold text-slate-700">{new Date(post.date).toDateString()}</blockquote>
      </div>

      <div className="mr-auto my-1">
        <h2>{post.description}</h2>
      </div>
    </div>
    ))}
    
  </div>
</main>
  )
}
