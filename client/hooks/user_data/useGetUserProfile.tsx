import { useState, useEffect } from 'react';

export default function useGetUserProfile(userId: string) {

  const [userData, setUserData] = useState({
    email: "",
    role: "",
    name: "",    
    assignedArea: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    
    setUserData({
        email: userId + "@gmail.com",
        role: "STS Manager",
        name: "Mehrajul Islam",
        assignedArea: "Gulshan-1, Dhaka",
    });     

    if (userData) {
        // Call the API           
        
        return userData;
    }    
    
    return null;
  }

  return {userData};
}