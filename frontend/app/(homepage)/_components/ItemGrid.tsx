"use client";
import { Product } from "@/types/Product";
import { getAllProducts } from "@/app/api/product/route";
import { useEffect, useState } from "react";
import Image from "next/image";

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
        console.log(response);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }

  if (products == undefined) {
    return <div>Error: undefined products</div>;
  }
  return (
    <div>
      <h2>Products</h2>
      <div className="item-grid">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <Image src={product.imgUrl} alt={product.name} layout="fill" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            {/* Other details */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemGrid;
