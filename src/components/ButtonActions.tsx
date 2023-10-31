import { PenSquare, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC, useState} from 'react'
import { prisma } from "@/db"
import { useRouter } from 'next/navigation'


interface ButtonActionProps {
    id: string
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {

    const [isConfirmationOpen, setConfirmationOpen] = useState(false)
  
    // async function deleteTodo() {
    //     "use server";

    // }

//     const handleDelete = () => {
//         setConfirmationOpen(true)
//     }
//     const confirmDelete = () => {
//         setConfirmationOpen(false)
//         deleteTodo()
//     }
//     const cancelDelete = () => {
//         setConfirmationOpen(false)
//   }

    return (
        <div className="col-span-1 flex justify-start">
            <Link href={`/edit/${id}`} ><PenSquare /></Link>
            <button> <Trash2 className="text-red-400"/></button>
           
        </div>
    )
}

export default ButtonAction

