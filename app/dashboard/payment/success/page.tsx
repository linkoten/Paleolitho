import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { getUser } from "@/lib/actionsUsers";
import { getCart, emptyCart } from "@/lib/actionsCart";
import { decrementProductStock } from "@/lib/actionsProducts";

export default async function SuccessPage() {
  const user = await getUser();
  const cart = await getCart(user?.id as string); // Attempt to get the cart
  console.log("je suis le user", cart?.cartItems);
  const cartItems = cart?.cartItems;

  if (cartItems) {
    for (const product of cartItems) {
      const productId = product.product.id;
      const quantity = product.quantity;
      decrementProductStock(productId, quantity); // Call your function here
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await emptyCart(user?.id as string);
  }

  return (
    <section className="w-full h-screen pt-20 text-center">
      <Card className="w-[400px] mx-auto p-4">
        <BadgeCheck className="text-8xl mb-3 text-green-500 text-center w-full" />
        <h1 className="text-xl  font-black mb-2 text-center uppercase ">
          Paiement réussi !
        </h1>
        <p className="text-muted-foreground text-sm mb-2">
          Félicitation, votre achat a bein été effectué !
        </p>
        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          <Link href="/dashboard/shop">Retour sur le Dashboard </Link>
        </Button>
      </Card>
    </section>
  );
}
