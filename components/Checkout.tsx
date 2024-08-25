"use client";

import React, { useEffect } from "react";
import { getAllProducts } from "@/lib/actionsProducts";
import { useState } from "react";
import axios from "axios";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";





export default function Checkout(user: any) {
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const checkStockAvailability = () => {
      const cartItems = user.user.cart.cartItems;
      const isStockExceeded = cartItems.some((item: any)  => item.quantity > item.product.stock);
      setIsButtonDisabled(isStockExceeded);
    };

    checkStockAvailability();
  }, [user]);

  console.log(user);

  const checkout = async () => {
    setLoading(true);
    try {
      const cartItems = user.user.cart.cartItems;
      console.log("Cart items:", cartItems);

      // Send all cart items in one request
      const response = await axios.post(
        "/api/webhook/stripe/payment",
        cartItems
      );
      const responseData = await response.data;
      console.log("Response data:", responseData);
      window.location.href = responseData.url;
    } catch (error: any) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-6">
      <Button
        onClick={checkout}
        className=" w-full "
        disabled={isButtonDisabled || loading}
      >
        {loading ? "Processing..." : "Checkout"}
      </Button>
      {isButtonDisabled && (
        <p className="text-red-500 mt-2">
          Certains articles de votre panier ont une quantité supérieure au stock disponible.
        </p>
      )}
    </div>
  );
}
