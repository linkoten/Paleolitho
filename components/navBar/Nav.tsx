"use client";

// import {ThemeToggle} from "./ThemeToggle"
//<ThemeToggle/>

import Logo from "@/public/Paleolitho4.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="max-w-[1200px] w-full mx-auto h-[80px] flex items-center justify-between p-5 border-b  border-gray-300">
      <div>
        <Link href="/">
          <Image
            width={200}
            height={30}
            src={Logo}
            className=" w-auto h-16"
            alt="Paleolitho"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/dashboard/home">Home</Link>
          <Link href="/sign-in">SignIn</Link>
          <Link href="/sign-out">SignOut</Link>
        </div>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>{" "}
      </div>
    </nav>
  );
}
