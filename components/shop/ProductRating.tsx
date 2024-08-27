"use client";

import React, {  useEffect, useState } from "react";
import { Star } from "lucide-react";
import { rateProduct } from "@/lib/actionsProducts";
import { Input } from "../ui/input";

const ProductRating = ({ userId, productId, ratings }: any) => {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);


  useEffect(() => {
    // Vérifier si l'utilisateur a déjà noté le produit
    const userRating = ratings.ratings.find((rating: any) => rating.userId === userId);
    if (userRating) {
      setUserRating(userRating.rating);
    } else {
      setUserRating(null);
    }
  }, [ratings, userId]);

  const handleRating = async (newRating: any) => {
    setRating(newRating);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("productId", productId);
    formData.append("rating", newRating);

    try {
      await rateProduct(formData);
    } catch (error) {
      console.error("Erreur lors de la soumission de la note :", error);
    }
  };

  const totalRatings = ratings.ratings.length;
  const sumRatings = ratings.ratings.reduce((sum: any, rating: any) => sum + rating.rating, 0);
  const averageRating = sumRatings / totalRatings;

 console.log(ratings)

 console.log(userId)


  return (
    <form action={rateProduct}>
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
       <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillClass = userRating !== null
            ? (userRating >= star ? "text-yellow-400" : "text-gray-400")
            : (averageRating >= star ? "text-yellow-400" : "text-gray-400");

          return (
            <Star
              key={star}
              className={`h-5 w-5 ${fillClass} hover:fill-yellow-400`}
              onClick={() => handleRating(star)}
            />
          );
        })}
        <span className="ml-1 text-sm font-medium">{averageRating.toFixed(2)} / 5</span>
        <span className="ml-1 text-xs text-muted-foreground">
          ({totalRatings} avis)
        </span>
      </div>
    </form>
  );
};

export default ProductRating;
