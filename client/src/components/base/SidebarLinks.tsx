import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react"; 
import { Search, SmartphoneCharging, NotebookTabs, History, Handshake, UserPlus, Link as Link2, UserCog } from "lucide-react";
import AddPost from "../post/AddPost";
import UserAvatar from '../common/UserAvatar';
import { getImageUrl } from "@/lib/utils";
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";



export default function SidebarLinks(
){
  const { data: session } = useSession(); // Get the session data  
  console.log("Session Data:", session); // Log session data  
  const userImage = session?.user?.image;
  return (
    <div>
     <Link href="/" className="flex space-x-4 items-center py-4">  
        {userImage && <UserAvatar image={userImage}   />} 

        <p>Home</p>  
      </Link>  

      <p className="my-2 font-bold text-muted-foreground">Update here</p>
      <ul>
        {/* <li>
          <Link href="/profile" className="flex space-x-3 items-center mb-4">
          <UserCog/>
            <p>Profile</p>
          </Link>
        </li> */}
        <li>
          <Link href="/notes" className="mb-4 flex space-x-3 items-center">
          <NotebookTabs className="w-7 h-7" />
            <p>Notes List</p>
          </Link>
        </li>
        <li>
          <Link href="/addnotes" className="mb-4 flex space-x-3 items-center">
          <NotebookTabs className="w-7 h-7" />
            <p>Add Notes</p>
          </Link>
        </li>
        <li>
          <Link href="/users" className="mb-4 flex space-x-3 items-center">
          <Handshake />
            <p>All Users</p>
          </Link>
        </li>
        {/* <li>
          <Link href="/search" className="mb-4 flex space-x-3 items-center">
            <Search className="w-5 h-5" />
            <p>Find</p>
          </Link>
        </li> */}
        <li>
          <AddPost/>
        </li>

      </ul>
    </div>
  );
}
