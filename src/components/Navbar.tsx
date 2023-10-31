import React from 'react'
import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="navbar bg-gray-900 rounded mb-10">
        <div className="container">
            <div className="flex-none justify-end">
                <Link href='/new' className='btn btn-ghost'>Add New Todo</Link>
            </div>
            <div className="flex-none justify-end">
                <Link href='/tag' className='btn btn-ghost'>Add New Tag</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
