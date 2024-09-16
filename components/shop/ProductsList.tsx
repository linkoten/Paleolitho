import {  User } from "@prisma/client";
import Card from "./ProductsCard";

interface Products {
  id: string;
  title: string | null; // Allow title to be null
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  stock: number;
  images: string[];
  country: string;
  locality: string;
  period: string;
  stages: string
}

interface ListCardsProps {
  products: Products[];
  user: User;

}

function ListCards({ products, user }: ListCardsProps) {

  console.log(products)
  return (
    <section className="p-3">
      <div className="max-w-[1200px] p-12 sm:p-0 mx-auto grid grid-cols-1 lg:grid-cols-2  gap-6 pt-6 ">
        {products.map((item, index) => (
          <Card key={index} item={item} user={user} />
        ))}
      </div>
    </section>
  );
}

export default ListCards;
