import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  const description = data.get("description")?.valueOf();

  if (typeof title !== "string") {
    throw new Error("Invalid Title");
  }

  // await prisma.todo.create({ data: { title, description, complete: false } });
  await prisma.todo.create({
    data: {
      title: title as string,
      description: description as string,
      complete: false,
    },
  });
  
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Add Todo</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col mb-8">
        <input
          type="text"
          name="title"
          className="border border-slate-300 bg-transparent px-2 py-1 rounded focus-within:border-slate-100 outline-none"
          placeholder="Title"
        />
        <textarea
          name="description"
          className="border border-slate-300 bg-transparent px-2 py-1 rounded focus-within:border-slate-100 outline-none"
          placeholder="Description"
        />
        <div className="flex gap-1 justify-end">
          <Link href=".." className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover-bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
}
