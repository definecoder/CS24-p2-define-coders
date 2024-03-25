import { useState, useEffect } from 'react';

export default function useForgetPassInitiate() {

  const [userEmail, setUserEmail] = useState('');

  async function initiate() {
    
    if (userEmail) {
        // Call the login API
        alert(userEmail)
        return {status: true, token: 'matro dilam'};
    }    
    
    alert("Invalid credentials!");
    return {status: false, token: ''};
  }

  return {userEmail, setUserEmail, initiate};
}