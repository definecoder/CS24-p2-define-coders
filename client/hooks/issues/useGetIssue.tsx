import { apiRoutes } from "@/data/apiRoutes";
import { jwtToken } from "@/data/cookieNames";
import { message } from "antd";
import axios from "axios";
import { useState } from "react";
import { getCookie } from "@/lib/cookieFunctions";

type Issue = {
  issueType: string;
  description: string;
  latitude: string;
  longitude: string;
  isAnonymous: string;
};

export default function useGetIssue() {
  const [issueData, setIssueData] = useState<Issue[]>([]);

  async function getAllIssue() {
    try {
      const token = await getCookie(jwtToken);
      const res = await axios.get(apiRoutes.issue.create, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allIssues: Issue[] = res.data.map((issue: any) => ({
        issueType: issue.issueType,
        description: issue.description,
        latitude: issue.latitude,
        longitude: issue.longitude,
        isAnonymous: issue.isAnonymous,
      }));

      setIssueData(allIssues);

      return allIssues;
    } catch (error: any) {
      message.error(
        (error?.response?.data?.message || "Error fetching issue data.") +
          " Are you authorized?"
      );
    }
  }

  return { issueData, getAllIssue };
}
