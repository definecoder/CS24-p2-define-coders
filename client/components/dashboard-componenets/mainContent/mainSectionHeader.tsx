import Link from "next/link";
import {
  CircleUser,
  CircleUserRound,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MobileMenu from "../mobileMenu/mobileMenu";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext } from "react";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import { eraseCookie } from "@/lib/cookieFunctions";
import { jwtToken, role } from "@/data/cookieNames";

function logout(router: AppRouterInstance) {
  eraseCookie(role);
  eraseCookie(jwtToken);
  router.push("/auth/login");
}

export default function MainSectionHeader({
  role,
  subsection,
}: {
  role: string;
  subsection: string;
}) {
  const router = useRouter();
  const { currentActive, setCurrentActive } = useContext(NavContext);
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* Sheet for displaying menu in small screens */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <MobileMenu role={role} />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content of header */}
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search users, truck, sts..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      {/* Profile Icon and dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUserRound className="h-7 w-7" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push("profile/1234");
            }}
          >
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setCurrentActive(role + "-Settings")}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("auth/change-password");
            }}
          >
            Change Password
          </DropdownMenuItem>          
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-800 bg-red-100 bg-opacity-50"
            onClick={() => logout(router)}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
