// UserRow.tsx  
"use client";  
import React from 'react';  

interface User {  
  id: number;  
  name: string;  
  email: string;  
  username: string;  
  profile_image?: string;  
}  

interface UserRowProps {  
  user: User; // Explicitly define the User type for the prop  
}  

const UserRow: React.FC<UserRowProps> = ({ user }) => {  
  return (  
    <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white transition duration-200 hover:shadow-xl">  
      <div className="flex items-center">  
        {user.profile_image ? (  
          <img   
            src={user.profile_image}   
            alt={`${user.name} profile`}   
            className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 mr-4"   
          />  
        ) : (  
          <div className="w-16 h-16 bg-gray-200 rounded-full border-2 border-gray-200 mr-4 flex items-center justify-center">  
            <span className="text-gray-500">No image</span>  
          </div>  
        )}  
        <div>  
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>  
          <p className="text-gray-600">Username: <span className="font-medium">{user.username}</span></p>  
          <p className="text-gray-600">Email: <span className="font-medium">{user.email}</span></p>  
          <p className="text-gray-600">ID: <span className="font-medium">{user.id}</span></p>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default UserRow;

// // UserRow.tsx  
// import { API_ENDPOINTS } from '@/lib/apiUsers';  
// import React, { useEffect, useState } from 'react';  
// import UserItem from './comment/UserItem/UserItem';
//  // Import the new UserItem component  

// interface User {  
//     id: number;  
//     name: string;  
//     email: string;  
//     username: string;  
//     profile_image?: string;  
// }  

// const UserRow: React.FC = () => {  
//     const [users, setUsers] = useState<User[]>([]);  
//     const [loading, setLoading] = useState<boolean>(true);  
//     const [error, setError] = useState<string | null>(null);  

//     const fetchUsers = async () => {  
//         try {  
//             const response = await fetch(API_ENDPOINTS.users); // Use the API endpoint here  
//             if (!response.ok) {  
//                 throw new Error('Network response was not ok');  
//             }  
//             const data = await response.json();  
//             setUsers(data);  
//         } catch (error) {  
//             setError('Failed to load users');  
//         } finally {  
//             setLoading(false);  
//         }  
//     };  

//     useEffect(() => {  
//         fetchUsers();  
//     }, []);  

//     if (loading) return <div>Loading...</div>;  
//     if (error) return <div>{error}</div>;  

//     return (  
//         <div className="container mx-auto px-4 py-8">  
//             <h1 className="text-2xl font-bold mb-4">User List</h1>  
//             <table className="min-w-full bg-white">  
//                 <thead>  
//                     <tr>  
//                         <th className="py-2 px-4 border text-gray-900">ID</th>  
//                         <th className="py-2 px-4 border text-gray-900">Name</th>  
//                         <th className="py-2 px-4 border text-gray-900">Email</th>  
//                         <th className="py-2 px-4 border text-gray-900">Username</th>  
//                         <th className="py-2 px-4 border text-gray-900">Profile Image</th>  
//                     </tr>  
//                 </thead>  
//                 <tbody>  
//                     {users.map(user => (  
//                         <UserItem key={user.id} user={user} /> // Use the UserItem component  
//                     ))}  
//                 </tbody>  
//             </table>  
//         </div>  
//     );  
// };  

// export default UserRow;