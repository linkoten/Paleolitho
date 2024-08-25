'use client'
import { NotebookPen, Settings,CreditCard,Image,KeyRound   } from 'lucide-react';

import Link from "next/link";

import { usePathname } from "next/navigation"

export default function DashboardNav(user: any) {

  const pathname = usePathname()

  const menuDashboard = [
    { name: "Home", icon: NotebookPen, path: "/dashboard/home"},
    { name: "Shop", icon: NotebookPen, path: "/dashboard/shop" },
    { name: "Blog", icon: Image , path: "/dashboard/blog" },
    
  ];

  const menuDashboardAdmin =     
  { name: "Admin", icon: Settings, path: "/dashboard/admin"}


  return (
    <nav className="flex md:flex-col md:h-full md:w-16 w-full lg:w-40 gap-2">
      {menuDashboard.map((link, index) => 
        { const isActive = pathname.startsWith(link.path)
         return (
        <Link href={link.path} key={index} passHref>
          <div className={`flex items-center justify-center lg:justify-start gap-2 cursor-pointer lg:p-3 p-3 hover:bg-orange-500  hover:bg-opacity-50 hover:text-white text-sm font-bold rounded-md ${isActive && "bg-orange-500 text-white"}`} >
            <link.icon className='w-4' />
            <span className="hidden lg:block">{link.name}</span>
          </div>
        </Link>
      )})}
    {user.user.role === "ADMIN" && (
        <Link href={menuDashboardAdmin.path} passHref>
          <div className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer lg:p-3 p-3 hover:bg-orange-500 hover:bg-opacity-50 hover:text-white text-sm font-bold rounded-md ">
            <menuDashboardAdmin.icon className="w-4" />
            <span className="hidden lg:block">{menuDashboardAdmin.name}</span>
          </div>
        </Link>
      )}
    </nav>
  );
}