import { getSidebarElements } from "@/data/sidebarElements/getSidebarByRole";
import Link from "next/link";
import { SidebarItem } from "../sidebar/SidebarItem";
import { NavContext } from "@/hooks/contexts/useNavCtx";
import { useContext } from "react";

export default function MobileMenu({ role }: { role: string }) {
  const SidebarItemList = getSidebarElements(role);
  const { currentActive, setCurrentActive } = useContext(NavContext);
  return (
    <>
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
        <img src="/logoBlack.png" alt="logo" className="h-16 w-16 ml-2 mr-2" />
      </Link>
      {SidebarItemList.map((item, index) => (
        <SidebarItem
          key={index}
          Icon={item.Icon}
          title={item.title}
          active={currentActive.endsWith(item.title)}
          onclick={() => setCurrentActive(role + "-" + item.title)}
        />
      ))}
    </>
  );
}
