"use client";
import Image from "next/image";
import { Product } from "@/types/Product";
import Link from "next/link";
import { useContext, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/components/providers/cart-provider";

interface ProductItemV2Props {
  product: Product;
}

const ProductItem: React.FC<ProductItemV2Props> = ({ product }) => {
  const { incrementCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    incrementCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

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
      </div>
    </div>
  );
};

export default ProductItem;
