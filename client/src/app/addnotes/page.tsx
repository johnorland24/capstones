import Navbar from '@/components/base/Navbar'
import Sidebar from '@/components/base/Sidebar'
import UserRow from '@/components/UserRow'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

import NotesList from '../../components/notes/NotesList';
import AddNote from '@/components/notes/AddNote';

export default async function page() {
  const session = (await getServerSession (authOptions)) as CustomSession;
  return (

    <div className="overflow-y-hidden h-screen">
      <Navbar user={session.user!} />
      <div className="flex ">
        <Sidebar />
    <div  className="flex justify-center items-center w-full overflow-y-scroll border-separate border-spacing-2 border-">
     <div className=''>
    <AddNote/>
     </div>
    </div>
    </div>
    </div>
  )
}
