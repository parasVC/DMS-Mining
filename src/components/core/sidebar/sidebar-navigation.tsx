"use client";

import { ChevronRight } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/data/sidebar-items";
import Link from "next/link";
import { sidebarItems } from "@/data/sidebar-items";

export default function SidebarNavigation({ roleType }: { roleType: string }) {
  const sidebartItemsList : NavGroup[] = sidebarItems[roleType]
  
  return (
    <>
      {sidebartItemsList.map((navGroup) => (
        <SidebarGroup key={navGroup.id}>
          {navGroup.label && <SidebarGroupLabel>{navGroup.label}</SidebarGroupLabel>}
          <SidebarMenu className="gap-2">
            {navGroup.items.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                    <Link href={item.path} className="flex  w-full items-center gap-2">
                    {item.icon && <item.icon size={20}/>}
                      <span>{item.title}</span>
                    </Link>
                      {item.subItems && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.subItems && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subItems.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link className="flex items-center gap-2" href={subItem.path}>
                              {subItem.icon && <subItem.icon size={20}/>}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
