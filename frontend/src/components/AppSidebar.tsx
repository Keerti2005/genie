
import { Home, ShoppingCart, Gift, User, LogOut, Leaf } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Cart",
    url: "cart",
    icon: ShoppingCart,
  },
  {
    title: "Rewards",
    url: "rewards",
    icon: Gift,
  },
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-48">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="p-2 bg-eco-green rounded-lg">
            <Leaf className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-sidebar-foreground">
            Walmart Genie
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
