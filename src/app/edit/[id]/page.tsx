import { prisma } from "@/db";
import { notFound, useSearchParams, useRouter, redirect } from 'next/navigation'
import Link from "next/link";
import { FC, useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'

interface TodoProps {
  params: {
    id: string
  }
}

async function getTodos(id: string) {
  const response = await prisma.todo.findFirst({
    where: {
      id: id
    },
    include: {
      tag: true
    }
  })
  return response
}

const EditTodo: FC<TodoProps> = async ({ params }) => {
  const todos = await getTodos(params.id);
  const tags = await prisma.tag.findMany();

  async function updateTodo(data: FormData){
    "use server";

    const title = data.get("title")?.valueOf();
    const description = data.get("description")?.valueOf();
    const tagId = data.get("tagId")?.valueOf();
  
    if (typeof title !== "string") {
      throw new Error("Invalid Title");
    }
  
    await prisma.todo.update({
      where: {
        id: params.id
      },
      data: {
        title: title as string,
        description: description as string,
        complete: false,
        tagId: tagId as string
      },
    });
    
    redirect("/");
  }

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl my-4 font-bold text-center">Update Todo</h1>
      </header>
      <form action={updateTodo} className="flex flex-col items-center justify-center gap-5 mt-10">
        <input
          type="text"
          name="title"
          defaultValue= {todos?.title}
          className="input input-bordered w-full max-w-sm"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          className="textarea textarea-bordered w-full max-w-sm"
          placeholder="Description"
          defaultValue={todos?.description ?? ''}
        />
        <select name="tagId" className="select select-bordered w-full max-w-sm" defaultValue={todos?.tag.id}>
          <option value="">Select Tags</option>
          {tags?.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <div className="flex gap-1 justify-end">
          <Link href=".." className="btn btn-warning mr-5">
           Cancel
          </Link>
          <button
            type="submit"
            className="btn btn-primary mr-5"
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-error"
          >
            Delete
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTodo;


// export default function Page({ params }: {
//     params: { id: string }
// }) {
//     return <h1>ID: {params.id}</h1>
// }