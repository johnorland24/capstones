"use client";
import React, { useEffect, useState } from "react";  
import {  
  Card,  
  CardContent,  
  CardFooter,  
  CardHeader,  
  CardTitle,  
} from "@/components/ui/card";  
import Image from "next/image";  
import { Heart, Link as LinkIcon, MessageSquare, Trash } from "lucide-react";  
import { formatDate, trimString } from "@/lib/utils";  
import { toast } from "react-toastify";  
import UserAvatar from "../common/UserAvatar";  
import axios from 'axios'; // Import axios  
import { API_ENDPOINTS } from "@/lib/apiUsers";  
import SearchInput from "../base/SearchInput";
import './Post.css';
// Import SearchInput  

interface User {  
  id: number;  
  name: string;  
  email: string;  
  username: string;  
  profile_image?: string;  
}  

export default function SearchData({   
  post,   
  onDelete,   
  currentUserId   
}: {   
  post: PostApiType;   
  onDelete: (id: number) => void;   
  currentUserId: number;  
})  {  
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query  
  const copyUrl = () => {  
    navigator.clipboard.writeText(post.url!);  
    toast.success("Link copied successfully!", { theme: "dark" });  
  };  

  const handleDelete = async () => {  
    try {  
      await axios.delete(`http://127.0.0.1:8000/api/posts/${post.id}`);  
      onDelete(post.id);  
      toast.success("Post deleted successfully!");  
    } catch (error) {  
      toast.error("Failed to delete the post.");  
    }  
  };  

  const [users, setUsers] = useState<User[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  

  const fetchUsers = async () => {  
    try {  
      const response = await fetch(API_ENDPOINTS.users);  
      if (!response.ok) {  
          throw new Error('Network response was not ok');  
      }  
      const data = await response.json();  
      setUsers(data);  
    } catch (error) {  
      setError('Failed to load users');  
    } finally {  
      setLoading(false);  
    }  
  };  

  useEffect(() => {  
    fetchUsers();  
  }, []);  

  if (loading) return <div>wait a moment...</div>;  
  if (error) return <div>{error}</div>;   

  // Function to filter users based on search query  
  const filteredUsers = users.filter((user) =>  
    user.name.toLowerCase().includes(searchQuery.toLowerCase())  
  );  

  return (  
    
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">  
    {/* Pass setSearchQuery to the SearchInput */}  
      <Card className="w-full h-auto bg-gray-900">  
        <figure>  
          <Image  
            src={post.image_url}  
            width={500}  
            height={300}  
            className="w-full h-auto object-cover rounded-xl"  
            alt="post_img"  
          />   
        </figure>  
        <CardHeader>  
          <CardContent className="p-4">  
            <div className="flex items-center space-x-3 mb-2">  
              <UserAvatar image={post.user.profile_image} />   
              <div className="flex flex-col">   
                <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>   

                <div>  
                  {filteredUsers.map(user => (  
                    <div key={user.id}> {/* Add a key to each user item */}  
                      {user.id === post.user_id && (  
                        <h2 className="text-sm font-semibold  text-blue-300">{user.name}</h2>   
                      )}  
                    </div>  
                  ))}  
                </div>  

                <h3 className="text-sm font-small">{trimString(post.title)}</h3>   
              </div>  
            </div>    
          </CardContent>  
        </CardHeader>  
        <CardFooter className="flex justify-between items-center border-t border-gray-200 p-4 card-footer-gradient">   
          <Heart size={20} className="text-gray-600 hover:text-red-600 transition-colors duration-200" />  
          <div className="flex items-center">  
            <MessageSquare size={20} className="text-gray-600 hover:text-blue-600 transition-colors duration-200" />  
            {post.comment_count > 0 && <span className="ml-1">{post.comment_count}</span>}  
          </div>   
          <div className="flex space-x-2">  
            <LinkIcon size={20} onClick={copyUrl} className="text-gray-600 hover:text-green-600 transition-colors duration-200 cursor-pointer" />  
            {post.user_id === currentUserId && (  
              <Trash size={20} onClick={handleDelete} className="text-gray-600 hover:text-red-600 transition-colors duration-200 cursor-pointer" />  
            )}  
          </div>  
        </CardFooter>  
      </Card>  
    </div>  
  );  
}