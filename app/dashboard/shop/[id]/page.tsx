import React, { Suspense } from "react";
import { getProduct, getProductRatings } from "@/lib/actionsProducts";
import SelectImage from "@/components/shop/SelectImage";
import Loading from "@/components/Loading";
import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserFromDatabase } from "@/lib/userAction";

interface Params {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image: number[];
}

interface ProductPageProps {
  params: Params;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);
  return {
    title: product?.title,
    description: product?.description,
  };
}

export default async function page({ params }: ProductPageProps) {
  const product = await getProduct(params.id);
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await getUserFromDatabase(userId); // Get from YOUR DB (again, now with stripeCustomerId)

  if (!product) return;
  if (!user) return;

  const ratings = await getProductRatings(params.id);

  if (!ratings) return;

  return (
    <Suspense fallback={<Loading />}>
      <SelectImage product={product} user={user} ratings={ratings} />
    </Suspense>
  );
}

/* {product.images?.map(image => (
  <div key={image.id}>
    <Image
      priority
      src={image.file.url}
      alt={image.file.metadata || ''}
      style={{
objectFit: 'contain',
}}
      fill
      className='h-full w-full sm:rounded-lg '
      sizes='(min-width: 1024px) 50vw, 100vw'
    />
  </div>
))} */
