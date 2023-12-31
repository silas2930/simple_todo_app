import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  const description = data.get("description")?.valueOf();
  const tagId = data.get("tagId")?.valueOf();

  if (typeof title !== "string") {
    throw new Error("Invalid Title");
  }

  // await prisma.todo.create({ data: { title, description, complete: false } });
  await prisma.todo.create({
    data: {
      title: title as string,
      description: description as string,
      complete: false,
      tagId: tagId as string
    },
  });
  
  redirect("/");
}

export default async function Page() {

  const tags = await prisma.tag.findMany();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl my-4 font-bold text-center">Add Todo</h1>
      </header>
      <form action={createTodo} className="flex flex-col items-center justify-center gap-5 mt-10">
        <input
          type="text"
          name="title"
          className="input input-bordered w-full max-w-sm"
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          className="textarea textarea-bordered w-full max-w-sm"
          placeholder="Description"
        />
        <select name="tagId" className="select select-bordered w-full max-w-sm" >
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
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}


