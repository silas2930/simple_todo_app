"use client"
import { prisma } from "@/db";
import { Tag } from "@prisma/client";
import { PenSquare, Trash2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ButtonAction from "@/components/ButtonActions";


type TodoItemProps = {
    id: string
    title: string
    description: string | null
    complete: boolean
    tag: Tag
    toggleTodo: (id: string, complete: boolean) => void
}

export function TodoItem({ id, title, description, complete, tag, toggleTodo }: TodoItemProps ){
    
    // const handleDelete = async () => {
    //     'use server'
    //     try {
    //       await prisma.todo.delete({
    //         where: {
    //           id: id,
    //         },
    //       });
    
    //     } catch (error) {
    //       console.error("Error deleting todo:", error);
    //     }
    // };

    return <li className="grid grid-cols-4 gap-1 items-center mb-3">
        <div className="col-span-2 flex">
        <input 
            id={id} 
            type="checkbox" 
            className="checkbox peer mr-3" 
            defaultChecked={complete}
            onChange={e => toggleTodo(id, e.target.checked)}
        />
        <label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
            {title}
            {description && <span className="text-gray-500 ml-2">({description})</span>}
            {<span className="badge badge-neutral ml-3">{tag.name}</span>}

        </label>
        </div>
        <ButtonAction id={id} />
    </li>
}