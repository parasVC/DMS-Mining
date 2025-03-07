import React from 'react'
import { SidebarHeader } from '@/components/ui/sidebar'
import { Collapsible,CollapsibleTrigger } from '@/components/ui/collapsible'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Axe } from 'lucide-react'
const SidebarHeaderMenu = () => {
  return (
    <SidebarHeader>
    <Collapsible>
      <CollapsibleTrigger asChild>
        <SidebarMenuButton tooltip={"Home"}>
          <Axe />
          <span>Mining DME</span>
        </SidebarMenuButton>
      </CollapsibleTrigger>
    </Collapsible>
  </SidebarHeader>
  )
}

export default SidebarHeaderMenu