import axios from 'axios';  

const API_URL = 'http://localhost:8000/api/addposts';  // Replace with your Laravel URL  

export const fetchPosts = async () => {  
    const response = await axios.get(API_URL);  
    return response.data;  
};  

export const createPost = async (postData: FormData) => {  
    const response = await axios.post(API_URL, postData, {  
      headers: {  
        'Content-Type': 'multipart/form-data',  
      },  
    });  
    return response.data;  
};