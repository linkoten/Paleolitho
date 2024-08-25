"use server";

import { User } from "@prisma/client";
import { addToCart } from "@/lib/actionsCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonToast from "@/components/ButtonToast";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface PostCardProps {
  item: {
    id: string;
    title: string 
    content: string
    createdAt: Date;
    updatedAt: Date;
    coverImage: string;
    excerpt: string

  }
}

export default async function PostCard({ item }: PostCardProps) {


  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden relative border">
      <Link href={`blog/${item.id}`}>
      <img
        src={item.coverImage}
        alt={`Image of ${item.title}`}
        className="w-full h-96 object-contain"
      />

    </Link>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 ">{item.title}</h3>
          
          <p className="text-gray-400 mb-4 line-clamp-3">{item.excerpt}</p>
         
        </div>
    </div>
  );
}
