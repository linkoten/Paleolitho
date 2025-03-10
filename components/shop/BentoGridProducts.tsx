"use client";

import React from "react";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Star } from "lucide-react";
import { Input } from "../ui/input";
import ButtonToast from "../ButtonToast";
import { Button } from "../ui/button";
import { toggleFavorite } from "@/lib/actionsProducts";
import { addToCart } from "@/lib/actionsCart";

interface Product {
  id: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  stock: number;
  images: string[];
  category: string;
  country: string;
  locality: string;
  period: string;
  stages: string;
}

interface BentoGridProps {
  products: Product[];
  user: User;
  favorite: any;
}

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  product,
  user,
  isFavorite,
}: {
  className?: string;
  product: Product;
  user: User;
  isFavorite: boolean;
}) => {
  const productId = product.id;
  const userId = user.id;
  const toastText = "Le produit a été ajouté au panier";
  const toastTextFavorite = isFavorite
    ? "Produit supprimé des favoris"
    : "Produit ajouté aux favoris";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 border border-black/10 dark:border-white/20 bg-white dark:bg-black p-4 overflow-hidden relative",
        className
      )}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg truncate dark:text-white">
          {product.title}
        </h2>
        <div className="flex space-x-2 items-center">
          <form action={toggleFavorite}>
            <Input
              type="text"
              name="userId"
              defaultValue={userId}
              className="hidden"
            />
            <Input
              type="text"
              name="productId"
              defaultValue={productId}
              className="hidden"
            />
            <ButtonToast
              type="submit"
              variant={"outline"}
              toastText={toastTextFavorite}
              className="border border-yellow-200 p-1"
            >
              <Star
                className={`cursor-pointer ${
                  isFavorite ? "fill-yellow-300" : ""
                }`}
                size={18}
              />
            </ButtonToast>
          </form>
          <Badge variant={"secondary"} className="text-sm">
            {product.price}€
          </Badge>
        </div>
      </div>

      <Link href={`shop/${product.id}`} className="block">
        <div className="relative h-48 w-full mb-3">
          <Image
            src={product.images[0]}
            alt={product.title || "Product image"}
            fill
            className="object-cover rounded-lg group-hover/bento:shadow-lg transition-all duration-300"
          />
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.country}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.locality}
          </Badge>

          <Badge variant="outline" className="text-xs">
            {product.period}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.stages}
          </Badge>
        </div>
      </Link>

      <div className="flex justify-between items-center mt-2">
        <p
          className={`text-sm font-medium ${
            product.stock > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? `Stock: ${product.stock}` : "Rupture de stock"}
        </p>

        {product.stock > 0 ? (
          <form action={addToCart} className="flex space-x-2">
            <Input
              type="text"
              name="userId"
              defaultValue={userId}
              className="hidden"
            />
            <Input
              type="text"
              name="productId"
              defaultValue={productId}
              className="hidden"
            />
            <Input
              type="number"
              name="quantity"
              defaultValue={1}
              min={1}
              max={product.stock}
              className="w-16 text-sm"
            />
            <ButtonToast
              toastText={toastText}
              type="submit"
              className="text-sm"
            >
              Ajouter
            </ButtonToast>
          </form>
        ) : (
          <Button
            disabled
            className="text-sm bg-red-500 line-through opacity-60"
          >
            Ajouter
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default function BentoGridProducts({
  products,
  user,
  favorite,
}: BentoGridProps) {
  return (
    <BentoGrid className="max-w-7xl mx-auto px-4">
      {products.map((product, i) => {
        const isFavorite = favorite?.favorites.some(
          (fav: any) => fav.product.id === product.id
        );

        const isEvenRow = Math.floor(i / 2) % 2 === 0; // Détermine si la ligne est paire ou impaire
        const isFirstProduct = i % 2 === 0; // Détermine si c'est le premier produit de la ligne

        let itemClass = "";

        if (isEvenRow) {
          // Ligne paire
          itemClass = isFirstProduct ? "md:col-span-2" : "md:col-span-1";
        } else {
          // Ligne impaire
          itemClass = isFirstProduct ? "md:col-span-1" : "md:col-span-2";
        }

        return (
          <BentoGridItem
            key={product.id}
            product={product}
            user={user}
            isFavorite={isFavorite}
            className={itemClass}
          />
        );
      })}
    </BentoGrid>
  );
}
