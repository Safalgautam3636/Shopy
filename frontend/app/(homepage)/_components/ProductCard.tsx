import Image from "next/image";
import { Product } from "@/types/Product";
import Link from "next/link";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
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
    <div className="max-w-sm overflow-hidden rounded shadow-lg dark:shadow-slate-700">
      <Link href={`/${product._id}`} passHref>
        <div className="relative h-48 w-full">
          <Image
            src={product.imgUrl}
            alt={product.name}
            fill={true}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="px-6 py-4">
          <div className="mb-2 truncate text-lg font-bold dark:text-gray-300">{product.name}</div>
          <p className="text-base text-gray-700 dark:text-gray-300">${product.price}</p>
          {/* Other details */}
        </div>
      </Link>
      {!isAdded ? (
        <button
          className="w-full rounded-b bg-blue-500 px-6 py-2 text-sm font-bold text-white hover:bg-blue-600 dark:bg-blue-900 dark:text-gray-300 dark:hover:bg-blue-950"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center justify-between rounded-b bg-blue-500 text-sm font-bold text-white dark:bg-blue-900">
          <div className="flex flex-1 justify-start">
            {quantity === 1 ? (
              <button onClick={handleRemove} className="h-full px-6 py-2.5 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-950">
                <FaRegTrashAlt />
              </button>
            ) : (
              <button onClick={handleDecrement} className="h-full px-6 py-2 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-950">
                -
              </button>
            )}
          </div>
          <span className="flex-1 text-center">{quantity}</span>
          <div className="flex flex-1 justify-end">
            <button onClick={handleIncrement} className="h-full px-6 py-2 hover:bg-blue-600 dark:bg-blue-900 dark:hover:bg-blue-950">
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
