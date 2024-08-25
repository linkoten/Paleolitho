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
    {favoriteProducts.favorites.map((product) => (
    <div key={product.product.id}>
    <div>{product.product.title}</div>
    <div>{product.product.id}</div>
    </div>
  ))}
  </div>
  );
  
}
