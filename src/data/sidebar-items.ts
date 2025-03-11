import { LucideIcon, Settings, Contact, Bean, Crown, GraduationCap, Lock } from "lucide-react";

export interface NavSubItem {
  title: string;
  path: string;
  icon?: LucideIcon;
}

export interface NavMainItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  isActive?: boolean;
  subItems?: NavSubItem[];
}

export interface NavGroup {
  id: number;
  label: string;
  items: NavMainItem[];
}

export const sidebarItems = {
  admin: <NavGroup[]>[
    {
      id: 1,
      label: "Overview",
      items: [
        {
          title: "Universities",
          path: "/admin/universities",
          icon: GraduationCap,
        }
      ],
    }
  ],
  client: <NavGroup[]>[
    {
      id: 1,
      label: "Overview",
      items: [
        {
          title: "Students",
          path: "/university/students",
          icon: Contact,
          isActive: false,
        },
        {
          title: "Licenses",
          path: "/university/licenses",
          icon: Crown,
          isActive: false,
        },
        {
          title: "Seeds",
          path: "/university/seeds",
          icon: Bean,
          isActive: false,
        }
      ],
    },
    {
      id: 2,
      label: "Others",
      items: [
        {
          title: "Settings",
          path: "#",
          icon: Settings,
          subItems: <NavSubItem[]>[{
            title: "Change Password",
            path: "/university/change-password",
            icon: Lock,
          }
          ]

        },
      ],
    }
  ],
};
