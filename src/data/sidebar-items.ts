import { LucideIcon, Settings, Contact, Bean, Crown, Home, GraduationCap, Lock } from "lucide-react";

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
          title: "Dashboard",
          path: "/admin/dashboard",
          icon: Home,
          isActive: true,
        },
        {
          title: "University",
          path: "/admin/university",
          icon: GraduationCap,
        }
      ],
    },
    {
      id: 2,
      label: "Others",
      items: [
        {
          title: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    }
  ],
  client: <NavGroup[]>[
    {
      id: 1,
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          path: "/university/dashboard",
          icon: Home,
          isActive: true,
        },
        {
          title: "Students",
          path: "/university/student",
          icon: Contact,
          isActive: false,
        },
        {
          title: "Licenses",
          path: "/university/license",
          icon: Crown,
          isActive: false,
        },
        {
          title: "Seed",
          path: "/university/seed",
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
  student: <NavGroup[]>[
    {
      id: 1,
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          path: "/student/dashboard",
          icon: Home,
          isActive: true,
        }
      ],
    },
    {
      id: 2,
      label: "Others",
      items: [
        {
          title: "Settings",
          path: "/settings",
          icon: Settings,
        },
      ],
    }
  ],
};
