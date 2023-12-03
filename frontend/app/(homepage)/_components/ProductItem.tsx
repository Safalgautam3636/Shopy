import Image from "next/image";
import { Product } from "@/types/Product";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <Link href={`/${product._id}`} passHref>
      <div className="max-w-sm overflow-hidden rounded shadow-lg">
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
          <div className="mb-2 text-xl font-bold">{product.name}</div>
          <p className="text-base text-gray-700">${product.price}</p>
          {/* Other details */}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
