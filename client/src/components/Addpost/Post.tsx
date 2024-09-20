import React from 'react';  

interface PostProps {  
    id: number;  
    user_id: number;  
    title: string;  
    content: string;  
    images?: string[];  
    comments?: string[];  
    likes?: number;  
}  

const Post: React.FC<PostProps> = ({ id, user_id, title, content, images = [], comments = [], likes = 0 }) => {  
    return (  
        <div className="bg-white p-4 rounded shadow mb-4">  
            <h2 className="text-xl font-bold">{title}</h2>  
            <p>{`Posted by User ID: ${user_id} (ID: ${id})`}</p>  
            <div className="mt-2">  
                {images.map((image, index) => (  
                    <img key={index} src={image} alt={`Post image ${index + 1}`} className="w-full h-auto rounded" />  
                ))}  
            </div>  
            <p className="mt-2">{content}</p>  
            <div className="mt-2">  
                <p>{`Likes: ${likes}`}</p>  
                <p>{`Comments: ${comments.length}`}</p>  
            </div>  
        </div>  
    );  
};  

export default Post;