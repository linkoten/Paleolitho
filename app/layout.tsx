import type { Metadata } from "next";
import { gentium_book_plus, inter } from "@/components/font";
import "./globals.css";
import SessionWrapper from "@/lib/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/navBar/Nav";
import Reg from "@/public/Reg.jpg";

export const metadata: Metadata = {
  title: "Paleolitho",
  description:
    "A Fossil E-Commerce Website, you will find Rare and Uniques Trilobites and Shells from Morroco and France.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gentium_book_plus.className} relative`}>
        {/* Image de fond fixe */}
        <div
          className="fixed inset-0 bg-cover bg-center -z-10 opacity-20"
          style={{ backgroundImage: `url(${Reg.src})` }}
        ></div>

        {/* Contenu défilant */}
        <div className="relative z-10">
          <SessionWrapper>
            <Toaster />
            <Nav />
            {children}
          </SessionWrapper>
        </div>
      </body>
    </html>
  );
}
