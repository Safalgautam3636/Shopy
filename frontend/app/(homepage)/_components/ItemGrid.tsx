"use client";
import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "@/app/api/product/route";
import { Product } from "@/types/Product";
import ProductItem from "./ProductItem";

function ItemGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getAllProducts();
        setProducts(response.data.allProducts);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const cachedProductList = useMemo(() => products, [products]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!cachedProductList || cachedProductList.length === 0) {
    return <div>Error: products not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cachedProductList.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemGrid;
