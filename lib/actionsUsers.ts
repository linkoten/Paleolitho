"use server"
import {prisma} from "./db";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/lib/authOptions";
import { revalidatePath } from "next/cache";


export const getUser = async () => {
  const session = await getServerSession(authOptions);

  // Vérifier si la session et l'utilisateur sont définis
  if (!session || !session.user || !session.user.id) {
    redirect("../");
  }

  const id = session.user.id as string;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { cart: true }, // Inclure la relation cart

  });

  // Check if user email matches and role is USER
  if (user && (user.email === "cattofrancois@hotmail.com" || user.email === "patrick.catto@outlook.fr") && user.role === "USER") {
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" },
      });
      console.log("User role updated to ADMIN");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  }

  if (user && !user.cart) {
    try {
      await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });
      console.log("Empty cart created for the user");
    } catch (error) {
      console.error("Error creating cart:", error);
    }
  }

  return user;
};


export const updateUser = async (formData: FormData) => {
  try {
    const userName = formData.get('name') as string; 
    const id = formData.get('id') as string; 


    if (userName !== null) {
      await prisma.user.update({
        where: { id } ,
        data: { name: userName},
      });
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }finally {
    revalidatePath('/')
  } 
};

export const deleteUser = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id as string;

   if (!session || !session.user || !session.user.id) {
    redirect("../")
  }
  
  await prisma.user.deleteMany({
    where: { stripeCustomerId: userId },
  });
  await prisma.subscription.deleteMany({
    where: { userId: userId },
  });

  await prisma.session.deleteMany({
    where: { userId: userId },
  });

  await prisma.account.deleteMany({
    where: { userId: userId },
  });

  return redirect('../');
};

