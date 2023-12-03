"use client";
import { getProductById } from "@/app/api/product/route";
import { Spinner } from "@/components/Spinner";
import { Product } from "@/types/Product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const productId = params.productId;
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
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center pt-24">
        <Spinner size="lg" />
      </div>
    );
  }
  if (!product) return <div>Loading...</div>;
  return (
    <div className="pt-24">
      <h1>{product.name}dsads</h1>
    </div>
  );
}
