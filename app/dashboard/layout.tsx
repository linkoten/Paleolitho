import ButtonSignOut from "@/components/ButtonSignOut";
import DashboardNav from "@/components/DashboardNav";
import {getUser } from "@/lib/actionsUsers";
import {stripe} from "@/lib/stripe"
import { prisma } from "@/lib/db";
import Cart from "@/components/Cart";
import { createEmptyCart, getCart } from "@/lib/actionsCart";

export default async function DashboardLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();



  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <div>Please sign in</div>;
  }

  let cart;
  try {
    cart = await getCart(user?.id as string); // Attempt to get the cart
  } catch (error) {
    console.error("Error fetching cart:", error);
    cart = await createEmptyCart(user?.id as string); // Create an empty cart if fetching fails
    console.log("je suis la nouvelle cart", cart)
  }

  
  if (!user?.stripeCustomerId) {
    const stripeCustomer = await stripe.customers.create({
      email: user?.email as string,
    });

    await prisma.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        stripeCustomerId: stripeCustomer.id as string,
      }
    });
  }
  
  return (
    <section className="max-w-[1200px] mx-auto md:flex items-center gap-4 h-screen w-full mt-2 p-2">
      <DashboardNav user={user}/>
      <div className="relative h-full w-full">
        <div className="flex fixed top-2 right-2 z-10 items-center justify-end mb-2 mt-3 lg:mt-0 p-3 space-x-2 bg-zinc-200/50">

        <ButtonSignOut />
        <Cart user={user} cart={cart}/>

        </div>

        
        {children}
      </div>
    </section>
  );
}