import { setCookie } from '@/lib/cookieFunctions';
import { useState, useEffect } from 'react';

export default function useForgetPassInitiate() {

  const [userEmail, setUserEmail] = useState('');

  async function initiate() {
    
    if (userEmail) {
        // Call the login API
        alert(userEmail);
        setCookie('forgetPassToken', userEmail, 0.01);
        return true;
    }    
    
    alert("Invalid credentials!");
    return false;
  }

  return {userEmail, setUserEmail, initiate};
}