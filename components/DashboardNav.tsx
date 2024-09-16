'use client'
import { NotebookPen, Settings,CreditCard,Image,KeyRound   } from 'lucide-react';

import Link from "next/link";

import { usePathname } from "next/navigation"
import { SidebarDemo } from './textNavBar';

export default function DashboardNav({user}: any) {

  const pathname = usePathname()

  const menuDashboard = [
    { name: "Home", icon: NotebookPen, path: "/dashboard/home"},
    { name: "Shop", icon: NotebookPen, path: "/dashboard/shop" },
    { name: "Blog", icon: Image , path: "/dashboard/blog" },
    
  ];

  const menuDashboardAdmin =     
  { name: "Admin", icon: Settings, path: "/dashboard/admin"}


  return (
    <nav className="">
      <SidebarDemo  user={user}/>
    </nav>
  );
}