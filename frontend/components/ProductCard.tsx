"use client";
import Image from "next/image";
import { Product } from "@/types/Product";
import Link from "next/link";
import { useContext, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/components/providers/cart-provider";
import { useAuthContext } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/api/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { incrementCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const { authToken, user } = useAuthContext();

  const handleAddToCart = () => {
    incrementCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };
  async function handleDelete() {
    if (!product || !authToken || !product._id) {
      console.log("Product details or auth token is missing");
      return;
    }
    try {
      await deleteProduct(product._id, authToken);
      router.push("/#");
    } catch (err) {
      console.log("Error deleting product:", err);
    }
  }
  return (
    <div className="rounded-lg bg-white px-10 py-10 shadow-md dark:bg-gray-800 dark:shadow-lg">
      <Link href={`/product/${product._id}`} passHref>
        <div className="relative h-48">
          <Image
            src={product.imgUrl}
            alt={product.name}
            className="h-48 rounded-md"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
      </Link>
      <div className="mt-4">
        <Link href={`/product/${product._id}`} passHref>
          <h1 className="truncate text-lg font-bold uppercase text-gray-900 dark:text-white">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
        </Link>
        <div className="flex justify-between">
          <p className="mt-2 text-gray-900 dark:text-gray-100">{formatPrice(product.price)}</p>
          <p className="mt-2 text-gray-900 dark:text-gray-100">{product.stockQuantity === 0 ? "Out of Stock" : "In Stock"}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Button className="rounded text-xs font-bold uppercase" onClick={handleAddToCart} disabled={isAdded}>
          <span className={`${isAdded ? "hidden" : "px-1"}`}>add to cart</span>
          <span className={`${!isAdded ? "hidden" : "px-6"}`}>added</span>
        </Button>
        {user?.user?.isAdmin ? (
          <Button className="ml-2 bg-red-500" onClick={handleDelete}>
            (ADMIN) Delete
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductCard;
