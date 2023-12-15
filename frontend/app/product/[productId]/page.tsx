"use client";
import { deleteProduct, getProductById } from "@/api/product";
import { Spinner } from "@/components/Spinner";
import { useAuthContext } from "@/components/providers/auth-provider";
import { CartContext } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const productId = params.productId;
  const { incrementCart } = useContext(CartContext);
  const { authToken, isAuthenticated, user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (productId) {
      getProductById(productId as string)
        .then((res) => {
          setProduct(res.data.product || null);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error fetching product details:", err);
          setIsLoading(false);
        });
    }
  }, [productId]);

  async function handleDelete() {
    if (!product || !authToken || !product._id) {
      console.log("Product details or auth token is missing");
      return;
    }
    try {
      await deleteProduct(product._id, authToken);
      router.push("/");
    } catch (err) {
      console.log("Error deleting product:", err);
    }
  }

  const handleUpdate = () => {
    router.push(`/product/${product?._id}/edit/`);
  };

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
          <Button className="bg-black" onClick={() => incrementCart(product)}>
            Add to Cart
          </Button>
          {user?.user?.isAdmin ? (
            <>
              <Button className="ml-2 bg-blue-500 " onClick={handleUpdate}>
                Update
              </Button>
              <Button className="ml-2 bg-red-500 " onClick={handleDelete}>
                Delete
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
