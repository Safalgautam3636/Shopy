"use client";

import ProductGrid from "@/components/ProductGrid";
import { useParams } from "next/navigation";

function SearchPage() {
  const params = useParams();
  let searchQuery = params.query;
  console.log(searchQuery);
  if (Array.isArray(searchQuery)) {
    searchQuery = searchQuery[0];
  } else if (!searchQuery) {
    searchQuery = "";
  }
  return <ProductGrid filterQuery={searchQuery} />;
}

export default SearchPage;
