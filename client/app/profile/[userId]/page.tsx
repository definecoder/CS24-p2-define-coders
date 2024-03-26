"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";
import { PersonIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const userId = useParams().userId.toString();
  const router = useRouter();
  const { userData } = useGetUserProfile(userId);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <Button
        variant="outline"
        className="w-40"
        onClick={() => router.push("/dashboard")}
      >
        Back to Dashboard
      </Button>
      <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-10 rounded-xl flex flex-col justify-center items-center gap-8">
        <Avatar className="w-24 h-24">
          <AvatarFallback>
            <PersonIcon className="w-3/6 h-3/6" />
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-xl">Profile Page</h1>
        <div className="flex flex-col justify-center items-center">
          <h1><span className="font-bold">ID: </span>{userId}</h1>
          <p><span className="font-bold">Email: </span>{userData.email}</p>
          <p><span className="font-bold">Role: </span>{userData.role}</p>
          <p><span className="font-bold">Name: </span>{userData.name}</p>
          <p><span className="font-bold">Assigned Area: </span>{userData.assignedArea}</p>
        </div>
      </div>
    </div>
  );
}
