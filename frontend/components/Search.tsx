"use client";

import useDebounce from "@/hooks/useDebounce";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Search() {
  const params = useParams();
  const pathName = usePathname();
  const router = useRouter();
  const initialSearchQuery = params.query ? decodeURIComponent(params.query as string) : "";
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    // Prevent repeat requests when the user is typing
    if (debouncedSearchQuery) {
      router.push("/search/" + debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, router]);

  useEffect(() => {
    // Clear the search query when the user navigates to the home page
    if (pathName === "/") {
      setSearchQuery("");
    }
  }, [pathName]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <form className="mx-4 flex flex-1" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search..."
        className="w-full rounded-md px-4 py-2 text-black focus:outline-none focus:ring focus:ring-opacity-50 dark:text-white"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </form>
  );
}

export default Search;
