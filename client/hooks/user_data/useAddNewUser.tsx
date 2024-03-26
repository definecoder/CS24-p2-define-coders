import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useAddNewUser() {
  const [userData, setUserData] = useState({
    email: "",
    roleName: unassigned,
    password: "",
    username: "",
  });

  function isValid(useData: any) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return (
      useData.email.match(validRegex) &&
      useData.roleName !== "" &&
      useData.password !== "" &&
      useData.username !== ""
    );
  }

  const [roles, setRoles] = useState<string[]>();

  useEffect(() => {
    setRoles([admin, landfillManager, stsManager, unassigned]);
  }, []);

  async function createNewUser() {
    if (userData && isValid(userData)) {
      // call the api to create the user
      const res = await axios.post(
        "http://localhost:8585/auth/create",
        userData,
        {
          headers: {            
            Authorization: `Bearer ${getCookie(jwtToken)}`,
          },
        }
      );
      return "user created successfully";
    }

    return null;
  }

  return { roles, userData, setUserData, createNewUser };
}
