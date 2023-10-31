import { TodoItem } from "@/components/TodoItems"
import { prisma } from "@/db"
import Link from "next/link"

function getTodos() {
  return prisma.todo.findMany({
    include: {
      tag: true,
    },
  })
}

async function toggleTodo(id: string, complete: boolean) {
  "use server"

  await prisma.todo.update({ where: { id }, data: { complete }})
}

export default async function Home(){

  const todos = await getTodos()
  console.log(todos);
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl my-4 font-bold text-center">Todo List</h1>
      </header>
      <ul className="pl-4">
        {todos.map(todo => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
        ))}

        
      </ul>
    </>
  )
  
}