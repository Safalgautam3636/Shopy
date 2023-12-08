import Image from "next/image";
import { Product } from "@/types/Product";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Trash } from "lucide-react";

interface ProductItemV2Props {
  product: Product;
}

const ProductItem: React.FC<ProductItemV2Props> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  function handleAddToCart() {
    console.log("Add to cart:", product._id);
    setQuantity(1);
    setIsAdded(true);
  }
  function handleIncrement() {
    setQuantity((cur) => cur + 1);
  }
  function handleDecrement() {
    setQuantity((cur) => (cur > 1 ? cur - 1 : 1));
  }
  function handleRemove() {
    setQuantity(0);
    setIsAdded(false);
  }

  return (
    <div className="rounded-lg bg-white px-10 py-10 shadow-md dark:bg-gray-800 dark:shadow-lg">
      <Link href={`/${product._id}`} passHref>
        <Image src={product.imgUrl} alt={product.name} className="h-48 rounded-md" width={500} height={500} />
      </Link>
      <div className="mt-4">
        <Link href={`/${product._id}`} passHref>
          <h1 className="truncate text-lg font-bold uppercase text-gray-900 dark:text-white">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{product.category}</p>
        </Link>
        <p className="mt-2 text-gray-900 dark:text-gray-100">${product.price}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button className="rounded bg-gray-800 px-4 py-2 text-xs font-bold uppercase text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:bg-gray-500">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
