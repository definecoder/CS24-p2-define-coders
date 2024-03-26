import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function UnassignedSettingsPanel() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6  max-h-[calc(100vh-60px)] overflow-scroll">
      <div className="flex items-center hidden">
        <h1 className="text-lg font-semibold md:text-2xl">SETTINGS</h1>
      </div>
      <div className="flex flex-1 items-center justify-center md:justify-start rounded-lg border border-dashed shadow-sm md:px-10">
        <div className="grid gap-6 w-full p-6">
          <h1 className="text-lg font-semibold md:text-2xl">SETTINGS</h1>
          <Card>
            <CardHeader>
              <CardTitle>Change Username</CardTitle>
              <CardDescription>
                Enter new username change your username.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="User Name" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Enter new password change your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Password" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
