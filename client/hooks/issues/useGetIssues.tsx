"use client";
import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";
import { getCookie } from "@/lib/cookieFunctions";
import { message } from "antd";
import axios from "axios";
import { useState, useEffect, use } from "react";
import { set } from "react-hook-form";

type Issue = {
  issueType: string;
  description: string;
  latitude: number;
  longitude: number;
  isAnonymous: boolean;

};

export default function useGetIssues() {
  const [issueData, setIssueData] = useState<Issue[]>([]);

  async function getAllIssue() {
    try {
      const res = await axios.get(apiRoutes.issue.create , {
        headers: {
          Authorization: `Bearer ${await getCookie(jwtToken)}`,
        },
      });
      const AllIssue: Issue[] = res.data.map((issue: any) => ({
        issueType: issue.issueType,
  description: issue.description,
  latitude: issue.latitude,
  longitude: issue.longitude,
  isAnonymous: issue.isAnonymous
      }));

      console.log(AllIssue);
      setIssueData(AllIssue);


      return issueData;
    } catch (error: any) {
      message.error(error?.response?.data?.message + "Error fetching landfill data... Are you authorized?");      
    }
  }

  return { issueData, getAllIssue };
}
