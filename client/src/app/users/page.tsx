// page.tsx  
import Navbar from '@/components/base/Navbar'  
import Sidebar from '@/components/base/Sidebar'  
import UserRow from '@/components/UserRow'  
import React from 'react'  
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions';  
import { getServerSession } from 'next-auth';  
import { Card, CardContent } from "@/components/ui/card"  
import {  
  Carousel,  
  CarouselContent,  
  CarouselItem,  
  CarouselNext,  
  CarouselPrevious,  
} from "@/components/ui/carousel"  
import { API_ENDPOINTS } from '@/lib/apiUsers';


// types.ts (Create a separate file for types, if necessary)  

// Assuming this should be a server component to fetch data.  

const page = async () => {  
  const session = (await getServerSession(authOptions)) as CustomSession;  

  // Fetch users here (extend if needed)  
  const response = await fetch(API_ENDPOINTS.users);  
  const users = await response.json();  

  return (  
    <div className="overflow-y-hidden h-screen">  
      <Navbar user={session.user!} /> 
      <div className='flex'>
      <Sidebar /> 
      <div className=" m-auto ">  
      
        <Carousel 
           opts={{
            align: "start",
          }}
          className="w-full max-w-sm border-none"> 
          <CarouselContent>  
            {users.map((user) => (
              <CarouselItem key={user.id}>
                <div className="p-1">
                  <Card>
                    <CardContent className="block aspect-square items-center justify-center p-6">
                      <UserRow user={user} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>  
          <CarouselPrevious />  
          <CarouselNext />  
        </Carousel>  
      </div>  
    </div> 
    </div> 

  )  
}  

export default page;