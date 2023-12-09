"use client";
import { getProductById } from "@/api/product";
import { Spinner } from "@/components/Spinner";
import { useAuthContext } from "@/components/providers/auth-provider";
import { CartContext } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const productId = params.productId;
  const { incrementCart } = useContext(CartContext);
  const authContext = useAuthContext();

  useEffect(() => {
    if (productId) {
      getProductById(productId as string)
        .then((res) => {
          setProduct(res.data.product);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching product details:", err);
          setIsLoading(false);
        });
    }
  }, [productId]);

  if (!authContext) {
    return null;
  }
  const { user } = authContext;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return <div className="flex justify-center">Error: page not found</div>;
  }

  return (
    <div className="container">
      <div className="flex">
        <div className="mt-16 w-1/2">
          <Image src={product.imgUrl} alt={product.name} width={500} height={500} />
        </div>
        <div className="w-1/2 pl-8">
          <p className="mb-4 text-lg">{product.category}</p>
          <h1 className="mb-4 text-3xl font-semibold">{product.name}</h1>
          <p className="mb-4 text-lg ">{formatPrice(product.price)}</p>
          <p className="mb-6">In stock: {product.stockQuantity}</p>
          <div className="mb-6 flex items-center">
            <span className="mr-2 ">Rating: {product.ratings}</span>
          </div>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white transition duration-300 hover:bg-blue-600"
            onClick={() => incrementCart(product)}
          >
            Add to Cart
          </button>
          {user?.user?.isAdmin ? <Button className="ml-2 bg-red-500">(ADMIN) Delete</Button> : ""}
        </div>
      </div>
    </div>
  );
}
