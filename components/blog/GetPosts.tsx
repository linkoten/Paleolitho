"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BlogFilter from "@/components/blog/BlogFilter"; // Assurez-vous que le chemin est correct
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function generateMetadata() {
  return { title: "Posts" };
}

export default function GetPosts({ posts }: any) {
  const [filter, setFilter] = useState("");
  const [language, setLanguage] = useState("english"); // État pour suivre la langue actuelle

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
    console.log(filter);
  };

  const englishPosts = posts.map((post: any) => post.localizations[0]);
  const frenchPosts = posts.map((post: any) => post.localizations[1]);
  const currentPosts = language === "english" ? englishPosts : frenchPosts;

  const filteredPosts = filter
    ? currentPosts.filter((post: any) => post.tag == filter)
    : currentPosts;

  const toggleLanguage = () => {
    setLanguage(language === "english" ? "french" : "english");
  };

  console.log(filteredPosts);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Blog</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="h-full py-12">
        <div className="container">
          <h1 className="text-2xl font-semibold ">Articles</h1>
          <div className="flex justify-end">
            <Button onClick={toggleLanguage}>
              (
              {language === "english"
                ? "Changer en Français"
                : "Switch To English"}
              )
            </Button>
          </div>
          <BlogFilter
            options={[
              "Salon",
              "Collection",
              "Fouille",
              "Gisement ",
              "Excavation",
            ]}
            onFilterChange={handleFilterChange}
          />
          <div className="mt-2 p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8 ">
            {filteredPosts.map(
              ({ slug, date, id, title, coverImage, tag, excerpt }: any) => (
                <div key={id}>
                  <Link
                    key={id}
                    className="h-full"
                    href={`/dashboard/blog/${slug}`}
                  >
                    <Card className="w-full max-w-sm h-full hover:scale-105 hover:brightness-90">
                      <div className="aspect-w-4 aspect-h-5 relative">
                        <Image
                          src={coverImage?.url}
                          alt={title}
                          width={400}
                          height={500}
                          className="object-cover rounded-t-lg"
                          style={{
                            aspectRatio: "400/500",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <CardHeader className="grid gap-1 p-4">
                        <CardTitle className="text-md lg:text-lg h-12">
                          {title}
                        </CardTitle>
                        <CardDescription>{excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4  ">
                        <p className="  text-xs font-semibold">{tag}</p>
                        <p className=" text-xs font-semibold">{date}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
