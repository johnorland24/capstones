"use client"
import Image from "next/image";  
import React, { useState } from "react";  
import { BellIcon } from "@radix-ui/react-icons";  
import { UserCog } from "lucide-react";  
import { Button } from "../ui/button";  
import { Menu } from "lucide-react";  
import MobileSidebar from "./MobileSidebar";  
import ProfileMenu from "./ProfileMenu";  
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";  
import SearchInput from "./SearchInput";  



export default function Navbar({ user }: { user: CustomUser }) {  
  const [searchText, setSearchText] = useState("");  

  const handleSearch = (text: string) => {  
    setSearchText(text);  
  };  

  return (  
    <nav className="flex justify-between items-center p-2 border-b shrink">  
      <MobileSidebar />  
      <div className="hidden md:block ml-2">  
        <Image src="/logo.svg" width={70} height={70} alt="logo" />  
      </div>  
     <div>
       {/* <SearchInput onSearch={handleSearch} />   */}
     </div>
      <div className="flex space-x-2 items-center">  
        <ProfileMenu user={user} />  
      </div>  
    </nav>  
  );  
}