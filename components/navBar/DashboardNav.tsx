"use client";

import { SidebarDemo } from "./textNavBar";

export default function DashboardNav({user}: any) {
  return (
    <nav className="   gap-2">
      <SidebarDemo user={user} />
    </nav>
  );
}
