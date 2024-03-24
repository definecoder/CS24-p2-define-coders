import { useState, useEffect } from 'react';

export default function useLogin() {

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  async function login() {
    
    if (loginData) {
        // Call the login API
        alert(loginData.email + " " + loginData.password)        
        return true;
    }    
    
    return false;
  }

  return {loginData, setloginData, login};
}