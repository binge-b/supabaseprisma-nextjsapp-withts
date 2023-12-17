"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from "react";
import { Toaster, toast } from 'react-hot-toast';

const editBlog = async (
    title: string | undefined,
    description: string | undefined,
    id: number
    ) => {
    const res = await fetch(`http://localhost:3001/api/blog/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, id }),
    });
    
    return res.json();
    };
// 編集ボタン押してもともとの記事の内容が表示できるようにする
const getBlogById = async (id: number) => {
    const res = await fetch(`http://localhost:3001/api/blog/${id}`);
    const data = await res.json();
    return data.post;
};

// 削除用関数
const deleteBlog = async (id: number) => {
  const res = await fetch(`http://localhost:3001/api/blog/${id}`,{
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
  });
  
  return res.json();
  };

const EditPost = ({ params }: { params: { id: number }}) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        toast.loading("編集中です（  ＾ω＾）・・・", {id: "1"});
        // refオブジェクトからDOM要素の値を取得し、postBlog関数に渡している↓
        await editBlog(titleRef.current?.value, descriptionRef.current?.value, params.id);

        toast.success("編集に成功！", {id: "1"});

        router.push("/");
        router.refresh();
    };

    // なぜか削除できない件
    const handleDelete = async () => {
      toast.loading("削除中です・・・")
      await deleteBlog(params.id);

      router.push("/");
      router.refresh();
    };

    useEffect(() => {
      getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description
        }
        
      }).catch(err => {
        toast.error("エラーが発生しました・・・！", {id: "1"});
      });
    }, []);

  return (
    <>
    <Toaster />
  <div className="w-full m-auto flex my-4">
    <div className="flex flex-col justify-center items-center m-auto">
      <p className="text-2xl text-slate-800 font-bold p-3">編集 🚀</p>
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
        <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
          更新
        </button>
        <button
        onClick={handleDelete}
        className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100">
          削除
        </button>
      </form>
    </div>
  </div>
</>
  )
}

export default EditPost;