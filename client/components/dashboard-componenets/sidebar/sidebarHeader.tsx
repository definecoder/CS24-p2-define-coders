import Link from "next/link";
import { admin, landfillManager, stsManager, unassigned } from "@/data/roles";

function getTitle(role: string) {
  switch (role) {
    case admin:
      return "Admin Dashboard";
    case landfillManager:
      return "Landfill Manager Dashboard";
    case stsManager:
      return "STS Manager Dashboard";
    default:
      return "EcoSync";
  }
}

const SidebarHeader = ({role} : {role: string}) => {
  return (
    <div className="flex h-20 items-center border-b px-4 lg:h-[80px] lg:px-6">
      <Link
        href="/"
        className="flex items-center gap-2 font-semibold"
      >
        <img
          src="/logo.png"
          alt="logo"
          className="h-16 w-16 ml-2 mr-2"
        />
        <span className="">{getTitle(role)}</span>
      </Link>
    </div>
  );
};
export default SidebarHeader;