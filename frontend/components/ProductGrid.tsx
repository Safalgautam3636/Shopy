"use client";
import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "@/api/product";
import { Product } from "@/types/Product";
import { Spinner } from "@/components/Spinner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import Fuse from "fuse.js";

function ProductGrid({ filterQuery = "" }: { filterQuery?: string }) {
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

  // Fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(products, { keys: ["name"], includeScore: true, threshold: 0.3 });
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterQuery ? fuse.search(filterQuery).map((result) => result.item) : products;
    let sorted = [...filtered];
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
  }, [products, sort, filterQuery, fuse]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center pt-44">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!filteredAndSortedProducts || filteredAndSortedProducts.length === 0) {
    return (
      <div className="flex items-center justify-center pt-44">
        <div className="mx-auto max-w-md rounded-md border border-red-400 bg-red-100 p-4 text-red-700">Error: products not found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center pb-5">
        <div className="pr-2">Sort By:</div>
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
      <div className="grid gap-4 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
