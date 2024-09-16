import { ThreeDCardDemo } from "@/components/3DCard";
import FavoriteList from "@/components/FavoriteList";
import ListCards from "@/components/shop/ProductsList";
import { getFavoritesProducts } from "@/lib/actionsProducts";
import { getUser } from "@/lib/actionsUsers";
import React from "react";

export default async function page() {
  const user = await getUser();

  if (!user) return;
  const userId = user.id;

  const favoriteProducts = await getFavoritesProducts(userId);

  if (!favoriteProducts) return;

  console.log("Je suis les favoris", favoriteProducts);
  return (
    <div className="grid grid-cols-2 gap-4">
      {favoriteProducts.favorites.map((data) => (
        <FavoriteList data={data?.product} user={user} favorite={favoriteProducts} />
      ))}
    </div>
  );
}
