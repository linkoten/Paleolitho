import React from "react";
import { getProduct } from "@/lib/actionsProducts";
import { getUser } from "@/lib/actionsUsers";
import SelectImage from "@/components/shop/SelectImage";


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

export default async function page({ params }: ProductPageProps) {
  const product = await getProduct(params.id);
  const user = await getUser()

  if (!product) return;
  if (!user) return




  return (
   <>
  
          <SelectImage product={product} user={user}/>
          </>
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
