import { useState, useEffect } from 'react';

export default function useForgetPassInitiate() {

  const [userEmail, setUserEmail] = useState('');

  async function initiate(setToken: Function) {
    
    if (userEmail) {
        // Call the login API
        alert(userEmail)
        setToken('matro dilam');
        return true;
    }    
    
    alert("Invalid credentials!");
    return false;
  }

  return {userEmail, setUserEmail, initiate};
}