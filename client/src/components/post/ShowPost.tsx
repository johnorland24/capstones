import React, { useState } from "react";  
import {  
  Dialog,  
  DialogContent,  
  DialogHeader,  
  DialogTitle,  
  DialogTrigger,  
} from "@/components/ui/dialog";  
import Image from "next/image";  
import AddComment from "../comment/AddComment";  

export default function ShowPost({  
  children,  
  post,  
}: {  
  children: React.ReactNode;  
  post: PostApiType;  
}) {  
  const [open, setOpen] = useState(false);  
  return (  
    <Dialog open={open} onOpenChange={setOpen}>  
      <DialogTrigger asChild>  
        <div>{children}</div>  
      </DialogTrigger>  
      <DialogContent className="max-w-full w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl overflow-hidden p-6 rounded-lg shadow-lg">  
        <DialogHeader>  
          <DialogTitle className="text-center">Show Post</DialogTitle>  
        </DialogHeader>  
        <div className="p-4">  
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">{post.title}</h1>  
          <Image  
            src={post.image_url}  
            width={400}  
            height={400}  
            alt="post_ing"  
            className="w-full rounded-lg my-2"  
            layout="responsive"  
          />  
          <AddComment post={post} />  
          <div className="mt-2 text-sm sm:text-base md:text-lg max-h-40 overflow-y-auto"> {/* Maximum height set here */}  
            <p>{post.description ?? ""}</p>  
          </div>  
        </div>  
      </DialogContent>  
    </Dialog>  
  );  
}