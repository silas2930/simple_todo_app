import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";

async function createTag(data: FormData) {
  "use server";

  const name = data.get("name")?.valueOf();

  if (typeof name !== "string") {
    throw new Error("Invalid Name");
  }

  // await prisma.todo.create({ data: { title, description, complete: false } });
  await prisma.tag.create({
    data: {
      name: name as string,
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
      <form action={createTag} className="flex flex-col items-center justify-center gap-5 mt-10">
        <input
          type="text"
          name="name"
          className="input input-bordered w-full max-w-sm"
          placeholder="Title"
          required
        />
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


