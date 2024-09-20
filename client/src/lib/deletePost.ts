// lib/apiEndpoints.ts  

import { API_URL } from "./apiEndPoints";



const API_BASE_URL = API_URL; // Replace with your actual API URL  

export const DEL_API_ENDPOINTS = {  
  users: `${API_BASE_URL}/posts`,  
  user: (id: number) => `${API_BASE_URL}/posts/${id}`,  
  // Add other endpoints as needed, for e.g., create, update etc.  
};