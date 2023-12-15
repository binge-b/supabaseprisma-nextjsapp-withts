"use client";

import { useRouter } from 'next/navigation';
import React, { useRef } from 'react'
import { Toaster, toast } from 'react-hot-toast';

// title,descriptionのAPIたたいて記事投稿するための関数
const postBlog = async (title: string | undefined, description: string | undefined) => {
const res = await fetch(`http://localhost:3001/api/blog`,{
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
});

return res.json();
};

// 以下でuseRefを使用してtitleRefとdescriptionRefという2つのrefオブジェクトを作成。それぞれのrefオブジェクトは、HTMLInputElementまたはHTMLTextAreaElementのDOM要素を参照する、初期値はnull。
const PostBlog  = () => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        toast.loading("投稿中です（  ＾ω＾）・・・", {id: "1"});
        // refオブジェクトからDOM要素の値を取得し、postBlog関数に渡している↓
        await postBlog(titleRef.current?.value, descriptionRef.current?.value);

        toast.success("投稿に成功！", {id: "1"});

        router.push("/");
        router.refresh();
    };

// ref属性を使用して、input要素とtextarea要素を{titleRef}と{descriptionRef}に関連付ける。これにより、これらの要素のDOMノードに直接アクセスできるようになる。
  return (
    <>
    <Toaster />
    <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-800 font-bold p-3">新規作成 😸</p>
      <form onSubmit={handleSubmit}>
        <input
          ref={titleRef}
          placeholder="タイトルを入力"
          type="text"
          className="rounded-md px-4 w-full py-2 my-2"
        />
        <textarea
          ref={descriptionRef}
          placeholder="記事詳細を入力"
          className="rounded-md px-4 py-2 w-full my-2"
        ></textarea>
        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-400 rounded-lg m-auto hover:bg-slate-100">
          投稿
        </button>
      </form>
    </div>
    </div>
    </>
  )
}

export default PostBlog;