"use client";

import React from "react";
import Image from "next/image";
import { addToCart } from "@/lib/actionsCart";
import { Input } from "../ui/input";
import ButtonToast from "../ButtonToast";
import { Button } from "../ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ShoppingCart, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductRating from "./ProductRating";
import { TextGenerateEffect } from "../ui/text-generate-effect";

interface SelectImageProps {
  product: any;
  user: any;
  ratings: any;
}

export default function SelectImage({
  product,
  user,
  ratings,
}: SelectImageProps) {
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  const zoomLevels = [1, 1.5, 2, 2.5];

  const handleZoom = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;

    setZoomPosition({ x, y });
  }, []);

  const handleZoomChange = useCallback((delta: number) => {
    setZoomLevel((prevLevel) => {
      const newLevel = prevLevel + delta;
      return Math.max(0, Math.min(newLevel, zoomLevels.length - 1));
    });
  }, []);

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      handleZoomChange(event.deltaY > 0 ? -1 : 1);
    },
    [handleZoomChange]
  );

  const words = product.description;

  const words2 = product.title;

  return (
    <section>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col  gap-6">
            {/* Première colonne : Carousel et images secondaires */}
            <div className="space-y-4 ">
              <h2 className="text-2xl font-bold pt-12">{product.title}</h2>

              <Carousel className=" mx-auto ">
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative h-96 ">
                      <Image
                        src={activeImage}
                        onClick={() => {
                          setIsModalOpen(true);
                        }}
                        alt={product.title}
                        className="rounded-lg w-auto h-full cursor-pointer object-cover"
                        fill
                        sizes="auto"
                      />
                      <Badge className="absolute top-2 right-2 bg-blue-600">
                        Nouveau
                      </Badge>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
              <div className="flex flex-wrap gap-2 overflow-x-auto justify-center ">
                {product.images.map((img: string, index: any) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 relative rounded-md overflow-hidden my-2 ${
                      activeImage === img ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setActiveImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} - vue ${index + 1}`}
                      fill
                      sizes="auto"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Deuxième colonne : Informations */}
            <div className="space-y-4 ">
              <div></div>
              <TextGenerateEffect words={words} className= " text-xs" />

              <ProductRating
                productId={product.id}
                userId={user.id}
                ratings={ratings}
              />
              <div className="flex flex-wrap gap-2 justify-center">
                <Badge>{product.category}</Badge>
                <Badge>{product.country}</Badge>
                <Badge>{product.locality}</Badge>
                <Badge>{product.period}</Badge>
                <Badge>{product.stages}</Badge>
              </div>
            </div>
            <Button
              variant={"ghost"}
              className="text-lg font-bold border border-yellow-200 w-fit mx-auto "
            >
              {product.price} €
            </Button>

            {/* Troisième colonne : Prix, stock et bouton */}
            <div className="space-y-4 flex flex-col justify-between ">
              {product.stock > 0 && <div className="flex mb-2"></div>}
              {product.stock > 0 ? (
                <form action={addToCart}>
                  <Input
                    type="text"
                    name="userId"
                    defaultValue={user.id}
                    className="  hidden"
                  />{" "}
                  <Input
                    type="text"
                    name="productId"
                    defaultValue={product.id}
                    className="  hidden"
                  />{" "}
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      name="quantity"
                      defaultValue={1}
                      className="w-1/2"
                    ></Input>
                    <ButtonToast
                      toastText="success"
                      type="submit"
                      className="  w-full"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au
                      panier
                    </ButtonToast>
                  </div>
                </form>
              ) : (
                <Button className=" bg-red-500 hover:bg-red-600 line-through cursor-not-allowed ">
                  <ShoppingCart className="mr-2 h-5 w-5" /> Ajouter au panier
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-3xl"
          title={product.title}
          aria-describedby={product.title}
        >
          <DialogTitle></DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </DialogClose>
          <div className="absolute left-4 top-4 z-10 flex gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleZoomChange(1)}
              disabled={zoomLevel === zoomLevels.length - 1}
            >
              <ZoomIn className="h-4 w-4" />
              <span className="sr-only">Zoomer</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handleZoomChange(-1)}
              disabled={zoomLevel === 0}
            >
              <ZoomOut className="h-4 w-4" />
              <span className="sr-only">Dézoomer</span>
            </Button>
          </div>
          <div
            className="relative h-[80vh] overflow-hidden "
            ref={imageRef}
            onMouseMove={handleZoom}
            onWheel={handleWheel}
          >
            <Image
              src={activeImage}
              alt={`${product.title} - vue ${activeImage + 1}`}
              fill
              objectFit="contain"
              style={{
                transform: `scale(${zoomLevels[zoomLevel]})`,
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
