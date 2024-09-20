"use client";
import { fetchPosts } from '@/api/posts';
import NewPost from '@/components/Addpost/NewPost';
import Post from '@/components/Addpost/Post';

import React, { useEffect, useState } from 'react';  
 
import { ToastContainer } from 'react-toastify'; // Import Toast for notifications  
import 'react-toastify/dist/ReactToastify.css';  

interface Post {
  id: number;
  // Add other properties of the post object here
}

const Home: React.FC = () => {  
    const [posts, setPosts] = useState<Post[]>([]);  

    useEffect(() => {  
        const loadPosts = async () => {  
            const data = await fetchPosts();  
            setPosts(data);  
        };  
        loadPosts();  
    }, []);  

    return (  
        <div className="container mx-auto p-4">  
            <NewPost />  
            {posts.map((post: Post) => (  
                <Post user_id={0} title={''} content={''} key={post.id} {...post} />  
            ))}  
            <ToastContainer /> {/* Toast notifications container */}  
        </div>  
    );  
};  

export default Home;
