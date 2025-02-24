"use client";
import ButtonsProviders from "@/components/ButtonsProviders";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Reg from "@/public/Reg.jpg";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard/shop");
  }
  return (
    <section className="w-full h-screen flex items-center justify-center flex-col gap-2 relative">
      <h1 className="text-4xl md:text-6xl  font-black mb-2 text-center uppercase flex items-center">
        <span>Paleolitho </span>
      </h1>

      <ButtonsProviders />
    </section>
  );
}
