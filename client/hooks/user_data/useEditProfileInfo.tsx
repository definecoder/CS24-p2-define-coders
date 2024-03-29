import { useState } from 'react';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, stsId } from '@/data/cookieNames'; // Ensure these variables are properly defined
import { apiRoutes } from '@/data/apiRoutes';

export default function useEditProfileInfo() {
  async function EditProfileInfo(data: {
    username: string;
    profileName: string;
  }) {
    

    try {
      const editedProfile = {
        username: data.username,
        profileName: data.profileName,
      };
    //   console.log(data.username);
    //   console.log(data.profileName);

      const res = await axios.put(
        apiRoutes.profile.edit,
        editedProfile,
        {
          headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
        }
      );

      // Handle the response as needed
    //   console.log(res.data);

      return true;
    } catch (error: any) {
      alert(error.message?.toString() || 'Error Editing');
      return false;
    }
  }

  return { EditProfileInfo };
}
