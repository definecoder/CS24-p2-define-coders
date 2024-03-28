"use client";
import BackgroundComponent from "@/components/profile/backgroundComp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetUserProfile from "@/hooks/user_data/useGetUserProfile";
import { PersonIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { EditIcon, Factory } from "lucide-react";

export default function ProfilePage() {
  const userId = useParams().userId.toString();
  const router = useRouter();
  //const { userData } = useGetUserProfile(userId);
  const RolePlace = "Station";

  return (
    <div className="w-screen h-screen ">
      <BackgroundComponent />
      <Button
        variant="outline"
        className="absolute top-[40px] m-24 mx-40"
        onClick={() => router.push("/dashboard")}
      >
        Back to Dashboard
      </Button>
      <div className="absolute top-[85px] w-4/5 mx-40 my-24 border-2 border-red-500 h-4/6 flex">
      <div className="h-full w-96 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-10 rounded-xl flex flex-col justify-center items-center gap-8">
        <Avatar className="w-24 h-24">
          <AvatarFallback>
            <PersonIcon className="w-3/6 h-3/6" />
          </AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-xl">Profile Page</h1>
        <div className="flex flex-col justify-center items-center">
          <h1><span className="font-bold">ID: </span>{userId}</h1>
          {/* <p><span className="font-bold">Email: </span>{userData.email}</p>
          <p><span className="font-bold">Role: </span>{userData.role}</p>
          <p><span className="font-bold">Name: </span>{userData.name}</p>
          <p><span className="font-bold">Assigned Area: </span>{userData.assignedArea}</p> */}
        </div>
        <Button
        variant="outline"
        className="w-24"
        onClick={() => router.push("/dashboard")}
      ><EditIcon className="h-4 w-4" />
        Edit
      </Button>
      </div>


      <div className="h-full w-4/6 ml-32 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground p-10 rounded-xl flex flex-col justify-center items-center gap-8">
        
        <Factory className="w-24 h-24" />
  
        <h1 className="font-bold text-xl">{RolePlace} Details</h1>
        <div className="flex flex-col justify-center items-center">
          <h1><span className="font-bold">ID: </span>{userId}</h1>
          {/* <p><span className="font-bold">Email: </span>{userData.email}</p>
          <p><span className="font-bold">Role: </span>{userData.role}</p>
          <p><span className="font-bold">Name: </span>{userData.name}</p>
          <p><span className="font-bold">Assigned Area: </span>{userData.assignedArea}</p> */}
        </div>
        
      </div>
      </div>
    </div>
  );
}
