import {
  fetchFilteredPages,
  fetchProductsPages,
  getAllProducts,
} from "@/lib/actionsProducts";
import ListCards from "@/components/shop/ProductsList";
import { getUser } from "@/lib/actionsUsers";
import Pagination from "@/components/shop/Pagination";
import Search from "@/components/shop/Search";
import Filters from "@/components/shop/Filters";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paleolitho/shop",
  description: "Official Shop of Paleolitho where you can find and buy Fossils"
}

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    country?: string;
    locality?: string;
    period?: string;
    stages?: string;
    category?: string;
  };
}) {
  const user = await getUser();

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const country = searchParams?.country || "";
  const locality = searchParams?.locality || "";
  const period = searchParams?.period || "";
  const stages = searchParams?.stages || "";
  const category = searchParams?.category || "";

  const totalPages = await fetchProductsPages(
    query,
    country,
    locality,
    period,
    stages,
    category
  );

  const products = await fetchFilteredPages(
    query,
    currentPage,
    country,
    locality,
    period,
    stages,
    category
  );

  const items = await getAllProducts();
  if (!user) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    return <div>Please sign in</div>;
  }

  if (!totalPages) {
    return (
      <>
        <div className=" text-center text-xl pt-20">
          {" "}
          Il n&apos;y a aucun produits qui correspondent à vos critères !
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Shop</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Search placeholder="Recherche..." />

      <Filters items={items} />
      <Suspense fallback={<Loading />}>
        <ListCards products={products} user={user} />
      </Suspense>
      <div className="mt-5 pb-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
