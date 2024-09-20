"use client";  
import React, { useEffect } from "react";  
import PostCard from "./PostCard";  
import { useImmer } from "use-immer";  
import { CustomUser } from "@/app/api/auth/[...nextauth]/authOptions";  
import { toast } from "react-toastify";  
import ShowPost from "./ShowPost";  
import { laraEcho } from "@/lib/echo.config";  

export default function ProfileInfo({  
  data,  
  user,  
}: {  
  data: APIResponseType<PostApiType>;  
  user: CustomUser;  
}) {  
  const [posts, setPosts] = useImmer<APIResponseType<PostApiType>>(data);  

  useEffect(() => {  
    laraEcho  
      .channel("post-broadcast")  
      .listen("PostBroadCastEvent", (event: any) => {  
        const post: PostApiType = event.post;  
        setPosts((draft) => {  
          draft.data = [post, ...draft.data];  
        });  
        toast.success("New Post added!!");  
      })  
      .listen("CommentIncrement", (event: any) => {  
        setPosts((draft) => {  
          const index = draft.data.findIndex(  
            (item) => item.id === event.post_id  
          );  
          if (index !== -1) {  
            draft.data[index].comment_count += 1;  
          }  
        });  
      });  

    return () => {  
      laraEcho.leave("post-broadcast");  
    };  
  }, []);  

  const handleDelete = (id: number) => {   
    setPosts((draft) => {  
      draft.data = draft.data.filter((post) => post.id !== id);  
    });  
  };  

  const currentUserId = user.id ? Number(user.id) : 0;  

  return (  
    <div  
      className="pt-4 pl-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-32"  
      style={{ height: "90vh" }}  
    >  
      {posts.data.length > 0 &&  
        posts.data.map((item) => (  
          <ShowPost post={item} key={item.id}>  
            <PostCard post={item} onDelete={handleDelete} currentUserId={currentUserId} />  
          </ShowPost>  
        ))}  
        
    </div>  
  );  
}