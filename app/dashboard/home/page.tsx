import FavoriteList from "@/components/shop/FavoriteList";
import Loading from "@/components/Loading";
import { getFavoritesProducts } from "@/lib/actionsProducts";
import React, { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserFromDatabase } from "@/lib/userAction";

export default async function page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await getUserFromDatabase(userId); // Get from YOUR DB (again, now with stripeCustomerId)

  if (!user) return;
  const userId2 = user.id;

  const favoriteProducts = await getFavoritesProducts(userId2);

  if (!favoriteProducts) return;

  console.log("Je suis les favoris", favoriteProducts);
  return (
    <div className="grid grid-cols-2 gap-4">
      <Suspense fallback={<Loading />}>
        {favoriteProducts.favorites.map((data, index) => (
          <FavoriteList
            key={index}
            data={data?.product}
            user={user}
            favorite={favoriteProducts}
          />
        ))}
      </Suspense>
    </div>
  );
}
