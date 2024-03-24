import { useState, useEffect } from 'react';

export default function useSignup() {

  const [signupData, setSignUpData] = useState({
    email: "",
    password: "",
  });

  async function signup() {
    
    if (signupData) {
        // Call the login API
        alert(signupData.email + " " + signupData.password)        
        return true;
    }    
    
    return false;
  }

  return {signupData, setSignUpData, signup};
}