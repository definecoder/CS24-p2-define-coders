import { useState } from 'react';
import { setCookie, getCookie } from '@/lib/cookieFunctions';
import axios from 'axios';
import { jwtToken, stsId } from '@/data/cookieNames'; // Ensure these variables are properly defined
import { apiRoutes } from '@/data/apiRoutes';
import { message } from 'antd';

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


      const res = await axios.put(
        apiRoutes.profile.edit,
        editedProfile,
        {
          headers: { Authorization: `Bearer ${getCookie(jwtToken)}` },
        }
      );

      message.success('Profile Edited Successfully');

      return true;
    } catch (error: any) {
      message.error(error?.response?.data?.message?.toString() || 'Error Editing');
      return false;
    }
  }

  return { EditProfileInfo };
}
