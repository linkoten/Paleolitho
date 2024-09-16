"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { User } from "@prisma/client";
import { getFavoritesProducts, toggleFavorite } from "@/lib/actionsProducts";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { Input } from "./ui/input";
import ButtonToast from "./ButtonToast";
import { addToCart } from "@/lib/actionsCart";

interface CardProps {
  data: {
    title: string | null; // Allow title to be null
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    price: number;
    stock: number;
    images: string[];
    id: string;
    country: string;
    locality: string;
    period: string;
    stages: string;
  };
  user: User;
  favorite: any;
}

export function ThreeDCardDemo({ data, user, favorite }: CardProps) {
  const productId = data.id;
  const userId = user.id;

  const toastText = "Le produit a été ajouté au panier";
  

  const isFavorite = favorite?.favorites.some(
    (favorite: any) => favorite.product.id === data.id
  );

  const toastTextFavorite = isFavorite ? "Produit supprimé des favoris" : "Produit ajouté aux favoris";

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <div className="flex justify-around">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {data.title}
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white z-50"
          >
            <form action={toggleFavorite}>
              <Input
                type="text"
                name="userId"
                defaultValue={userId}
                className="  hidden"
              />{" "}
              <Input
                type="text"
                name="productId"
                defaultValue={productId}
                className="  hidden"
              />{" "}
              <ButtonToast
                type="submit"
                variant={"outline"}
                toastText={toastTextFavorite}
              >
                <Star
                  className={`cursor-pointer ${
                    isFavorite ? "fill-yellow-300" : ""
                  }`}
                />
              </ButtonToast>
            </form>
          </CardItem>
        </div>
        <Link href={`shop/${data.id}`}>
          <CardItem
            as="ul"
            translateZ="60"
            className="flex flex-wrap gap-2 text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            <Badge className="text-center">{data.country}</Badge>
            <Badge>{data.locality}</Badge>
            <Badge>{data.period}</Badge>
            <Badge>{data.stages}</Badge>
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src={data.images[0]}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={data.title as string}
            />
          </CardItem>
        </Link>

        <div className="flex justify-between datas-center mt-20">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            <p className="text-gray-400 mb-4">
              {data.stock > 0 ? (
                <span className="text-green-500 font-bold">
                  Stock : {data.stock}
                </span>
              ) : (
                <span className="text-red-500 font-bold">out of stock</span>
              )}
            </p>
          </CardItem>

          <CardItem
            translateZ={20}
            as="div"
            className="px-4 py-2 rounded-xl  dark:bg-white dark:text-black  text-xs font-bold"
          >
            {data.stock > 0 && <div className="flex mb-2"></div>}
            {data.stock > 0 ? (
              <form action={addToCart}>
                <Input
                  type="text"
                  name="userId"
                  defaultValue={userId}
                  className="  hidden"
                />{" "}
                <Input
                  type="text"
                  name="productId"
                  defaultValue={productId}
                  className="  hidden"
                />{" "}
                <div className=" flex justify-around place-datas-end">
                  <Input
                    type="number"
                    name="quantity"
                    defaultValue={1}
                    placeholder="quantity"
                    className=" text-black"
                  ></Input>
                  <ButtonToast toastText={toastText} type="submit">
                    {" "}
                    Add To Cart
                  </ButtonToast>
                </div>
              </form>
            ) : (
              <Button className=" bg-red-500 hover:bg-red-600 line-through cursor-not-allowed  absolute bottom-2 right-2">
                {" "}
                Add To Cart
              </Button>
            )}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
