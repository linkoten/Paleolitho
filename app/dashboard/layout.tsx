import type React from "react";
import ButtonSignOut from "@/components/ButtonSignOut";
import { getUser } from "@/lib/actionsUsers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import Cart from "@/components/cart/Cart";
import { createEmptyCart, getCart } from "@/lib/actionsCart";
import DashboardNav from "@/components/navBar/DashboardNav";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) {
    return <div>Please sign in</div>;
  }

  let cart;
  try {
    cart = await getCart(user?.id as string);
  } catch (error) {
    console.error("Error fetching cart:", error);
    cart = await createEmptyCart(user?.id as string);
  }

  if (!user?.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user?.email as string,
    });

    await prisma.user.update({
      where: { id: user?.id as string },
      data: { stripeCustomerId: stripeCustomer.id as string },
    });
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav user={user} />
      <main className="flex-1 p-4 ml-[60px]">
        <div className="flex justify-end mb-4">
          <ButtonSignOut />
          <Cart user={user} cart={cart} />
        </div>
        {children}
      </main>
    </div>
  );
}
