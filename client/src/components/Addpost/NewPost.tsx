import { createPost } from '@/api/posts';
import React, { useState } from 'react';  
import { useDropzone } from 'react-dropzone';  
 // Change the path if necessary  
import { toast } from 'react-toastify';  

const NewPost: React.FC = () => {  
    const [title, setTitle] = useState('');  
    const [content, setContent] = useState('');  
    const [images, setImages] = useState<File[]>([]);  

    const onDrop = (acceptedFiles: File[]) => {  
        setImages((prev) => [...prev, ...acceptedFiles]);  
    };  

    const { getRootProps, getInputProps } = useDropzone({ onDrop });  

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();  
        const formData = new FormData();  
        formData.append('title', title);  
        formData.append('content', content);  
        images.forEach((image) => formData.append('images[]', image));  

        try {  
            await createPost(formData);  
            toast.success('Post created successfully!'); // Use toast for notifications (install react-toastify)  
            // Clear form  
            setTitle('');  
            setContent('');  
            setImages([]);  
        } catch (error) {  
            toast.error('Failed to create post.');  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">  
            <h2 className="text-xl font-bold">Create New Post</h2>  

            <div className="mt-4">  
                <input  
                    type="text"  
                    value={title}  
                    onChange={(e) => setTitle(e.target.value)}  
                    placeholder="Title"  
                    className="border p-2 w-full rounded"  
                    required  
                />  
            </div>  
            <div className="mt-4">  
                <textarea  
                    value={content}  
                    onChange={(e) => setContent(e.target.value)}  
                    placeholder="Content"  
                    className="border p-2 w-full rounded"  
                    required  
                ></textarea>  
            </div>  
            <div {...getRootProps()} className="mt-4 border-dashed border p-4 rounded cursor-pointer">  
                <input {...getInputProps()} />  
                <p>Drag & drop images here, or click to select images</p>  
            </div>  
            <div className="mt-4">  
                {images.map((file, index) => (  
                    <p key={index}>{file.name}</p>  
                ))}  
            </div>  
            <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded">Create Post</button>  
        </form>  
    );  
};  

export default NewPost;