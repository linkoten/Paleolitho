"use server";

import { User } from "@prisma/client";
import { addToCart } from "@/lib/actionsCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ButtonToast from "@/components/ButtonToast";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { addToFavorite } from "@/lib/actionsProducts";

interface CardProps {
  item: {
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
}

export default async function Card({ item, user }: CardProps) {
  const productId = item.id;
  const userId = user.id;

  const toastText = "Le produit a été ajouté au panier";

  console.log("je suis l'item", item);

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-lg overflow-hidden relative border">
      <Link href={`shop/${item.id}`}>
        <img
          src={item.images[0]}
          alt={`Image of ${item.title}`}
          className="w-full h-96 object-contain"
        />
        <div className="flex flex-wrap gap-2 overflow-hidden px-4  ">
          <Badge className="text-center">{item.country}</Badge>
          <Badge>{item.locality}</Badge>
          <Badge>{item.period}</Badge>
          <Badge>{item.stages}</Badge>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 ">{item.title}</h3>
        <div className="absolute top-2 right-2 space-x-2 rounded-md">
          <p className="text-white bg-amber-600 hover:bg-amber-700 ">
            {item.price}€
          </p>
          <form
            className="text-white bg-amber-600 hover:bg-amber-700 "
            action={addToFavorite}
          >
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
            <Button type="submit">Add</Button>
          </form>
        </div>
        <p className="text-gray-400 mb-4 line-clamp-3">{item.description}</p>
        <p className="text-gray-400 mb-4">
          {item.stock > 0 ? (
            <span className="text-green-500 font-bold">
              Stock : {item.stock}
            </span>
          ) : (
            <span className="text-red-500 font-bold">out of stock</span>
          )}
        </p>
        {item.stock > 0 && <div className="flex mb-2"></div>}
        {item.stock > 0 ? (
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
            <label>Quantity:</label>
            <Input
              type="number"
              name="quantity"
              defaultValue={1}
              className=" w-1/2 my-2"
            ></Input>
            <ButtonToast
              toastText={toastText}
              type="submit"
              className=" bg-green-500 hover:bg-green-600 absolute bottom-2 right-2"
            >
              {" "}
              Add To Cart
            </ButtonToast>
          </form>
        ) : (
          <Button className=" bg-red-500 hover:bg-red-600 line-through cursor-not-allowed  absolute bottom-2 right-2">
            {" "}
            Add To Cart
          </Button>
        )}
      </div>
    </div>
  );
}
