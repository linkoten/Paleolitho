import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { getProduct, updateProduct } from "@/lib/actionsProducts";
import ButtonToast from "@/components/ButtonToast";

interface Params {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}

interface UpdatePageProps {
  params: Params;
}

export default async function CreatePage({ params }: UpdatePageProps) {
  const product = await getProduct(params.id);

  console.log(product);

  const toastText = "Le produit a été modifié";

  return (
    <Card>
      <form action={updateProduct}>
        <Input type="hidden" value={product?.id} id="id" name="id" />
        <CardHeader>
          <CardTitle>Modification</CardTitle>
          <CardDescription>
            Modifier votre Produit puis sauvegarder
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="title">Titre</Label>
            <Input
              defaultValue={product?.title as string}
              placeholder="Titre de votre produit"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              defaultValue={product?.description as string}
              placeholder="Description de votre produit"
              name="description"
              id="description"
            />
          </div>

          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="price">Prix</Label>
            <Input
              defaultValue={product?.price as number}
              type="number"
              name="price"
              id="price"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="stock">stock</Label>
            <Input
              defaultValue={product?.stock as number}
              type="number"
              name="stock"
              id="stock"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="image">image</Label>
            <Input
              defaultValue={product?.image as string}
              placeholder="Image de votre produit"
              type="text"
              name="image"
              id="image"
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <Button className="bg-red-500 mx-1 my-2 hover:bg-red-600 text-white">
            <Link href="/dashboard/admin">Annuler</Link>
          </Button>
          <ButtonToast
            toastText={toastText}
            type="submit"
            className="bg-orange-500 mx-1 my-2 hover:bg-orange-600 text-white"
          > Modifier
          </ButtonToast>
        </CardFooter>
      </form>
    </Card>
  );
}
