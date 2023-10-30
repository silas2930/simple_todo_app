"use client"
import Link from "next/link";
import { redirect } from "next/navigation";


type TodoItemProps = {
    id: string
    title: string
    description: string | null
    complete: boolean
    toggleTodo: (id: string, complete: boolean) => void
}

export function TodoItem({ id, title, description, complete, toggleTodo }: TodoItemProps ){
    return <li className="flex gap-1 items-center">
        <input 
            id={id} 
            type="checkbox" 
            className="cursor-pointer peer" 
            defaultChecked={complete}
            onChange={e => toggleTodo(id, e.target.checked)}
        />
        <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
            {title}
            {description && <span className="text-gray-500 ml-2">({description})</span>}
        </label>

        <div className="flex gap-2">
            <Link href={`/edit/${id}`} 
             className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none">
                Edit
            </Link>
      </div>
    </li>
}