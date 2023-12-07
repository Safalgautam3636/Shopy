"use client";
import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "@/app/api/product/route";
import { Product } from "@/types/Product";
import ProductItem from "./ProductCard";
import { Spinner } from "@/components/Spinner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function ItemGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [sort, setSort] = useState("No Sorting");

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

  const sortedProducts = useMemo(() => {
    let sorted = [...products];
    switch (sort) {
      case "Highest to Lowest":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Lowest to Highest":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "Alphabetical A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sort]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!sortedProducts || sortedProducts.length === 0) {
    return <div>Error: products not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="pb-5">
        Sort By:{" "}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {sort}
              <span className="sr-only"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSort("No Sorting")}>No Sorting</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("Highest to Lowest")}>Highest to Lowest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("Lowest to Highest")}>Lowest to Highest</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("Alphabetical A-Z")}>Alphabetical A-Z</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort("Alphabetical Z-A")}>Alphabetical Z-A</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ItemGrid;