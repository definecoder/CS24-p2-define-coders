import { LucideIcon } from "lucide-react";

export const SidebarItem = ({
    Icon,
    title,
    active = true,
    onclick,
  }: {
    Icon: LucideIcon;
    title: string;
    active?: boolean;
    onclick: () => void;
  }) => {
    return (
      <div
        onClick={onclick}
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer ${
          active && "text-primary bg-muted"
        }`}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {title}
      </div>
    );
  };